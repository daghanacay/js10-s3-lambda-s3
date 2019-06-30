const s3Util = require('./s3-util'),
  path = require('path'),
  os = require('os'),
  OUTPUT_BUCKET = process.env.OUTPUT_BUCKET
  
exports.lambdaHandler = async (eventObject, context) => {
    const eventRecord = eventObject.Records && eventObject.Records[0],
    inputBucket = eventRecord.s3.bucket.name,
    key = eventRecord.s3.object.key,
    id = context.awsRequestId,
    tempPath = path.join(os.tmpdir(),  id)
    

  console.log('copying', inputBucket, key, 'to', OUTPUT_BUCKET);
  
  return s3Util.downloadFileFromS3(inputBucket, key, tempPath)
    .then(() => s3Util.uploadFileToS3(OUTPUT_BUCKET, key, tempPath));
};
