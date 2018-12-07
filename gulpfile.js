const gulp = require('gulp');
const gulpZip = require('gulp-zip');
const runSequence = require('run-sequence');
const gulpUtil = require('gulp-util');
const AWS = require('aws-sdk');
const del = require('del');
const fs = require('fs');

const applicationName = 'rene-ccc504';
const environmentName = 'rene-dev';
const awsRegion = 'us-east-1';
const bucketName = 'rene-ccc504-backend';
const zipName = 'te-dashboard-backend.zip';

AWS.config.update({
  accessKeyId: '',
  secretAccessKey: ''
});

gulp.task('copy_api_folder', () => {
  gulp.src('./api/**/*.*')
    .pipe(gulp.dest('./release_backend/api'));
});

gulp.task('copy_config_folder', () => {
  gulp.src('./config/**/*.*')
    .pipe(gulp.dest('./release_backend/config'));
});

gulp.task('copy_package_json_file', () => {
  gulp.src('./package.json')
    .pipe(gulp.dest('./release_backend'));
});

gulp.task('copy_server_file', () => {
  gulp.src('./server.js')
    .pipe(gulp.dest('./release_backend'));
});

gulp.task('copy_auth_file', () => {
  gulp.src('./auth.js')
    .pipe(gulp.dest('./release_backend'));
});

gulp.task('copy_jsconfig_file', () => {
  gulp.src('./jsconfig.json')
    .pipe(gulp.dest('./release_backend'));
});

gulp.task('zip_sample_app_backend', () => {
  gulp.src('./release_backend/**/*')
    .pipe(gulpZip(zipName))
    .pipe(gulp.dest('./deploy'));
});

gulp.task('clean_code', (done) => {
  var files = [].concat(['./release_backend', './deploy']);
  return del(files, done);
});

gulp.task('prepare_backend', (cb) => {
  var stream = runSequence('clean_code', 'copy_api_folder', 'copy_config_folder', 'copy_package_json_file', 'copy_server_file', 'copy_jsconfig_file', 'copy_auth_file', 'zip_sample_app_backend', cb);
  return stream;
});

gulp.task('deploy', ['update_elastic_beanstalk']);

gulp.task('update_elastic_beanstalk', ['push_to_s3'], (done) => {
  var eb = new AWS.ElasticBeanstalk({
    region: awsRegion
  });
  eb.createApplicationVersion({
    ApplicationName: applicationName,
    VersionLabel: '1.0.4',
    SourceBundle: {
      S3Bucket: bucketName,
      S3Key: zipName
    }
  }, (err) => {
    if (err) {
      throw new gulpUtil.PluginError('update-elastic-beanstalk', err);
    }
    eb.updateEnvironment({
      ApplicationName: applicationName,
      EnvironmentName: environmentName,
      VersionLabel: '1.0.4',
    }, (err) => {
      if (err) {
        throw new gulpUtil.PluginError('update-elastic-beanstalk', err);
      }
      done();
    });
  });
});

gulp.task('push_to_s3', (done) => {
  var s3 = new AWS.S3();
  var bucketConfiguration = {
    Bucket: bucketName
  };
  if (awsRegion !== 'us-east-1') {
    bucketConfiguration.CreateBucketConfiguration = {
      LocationConstraint: awsRegion
    };
  }
  s3.createBucket(bucketConfiguration, (err) => {
    if (err && err.code !== 'BucketAlreadyOwnedByYou') {
      throw new gulpUtil.PluginError('push_to_s3', err);
    }
    s3.upload({
      Bucket: bucketName,
      Key: zipName,
      Body: fs.createReadStream('./deploy/' + zipName)
    }, (err) => {
      if (err) {
        throw new gulpUtil.PluginError('push_to_s3', err);
      }
      done();
    });
  });
});
