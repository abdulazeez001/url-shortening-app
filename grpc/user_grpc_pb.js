/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable unicorn/prefer-module */
// GENERATED CODE -- DO NOT EDIT!

'use strict'
var grpc = require('grpc')
var user_pb = require('./user_pb.js')

function serialize_user_VerifyRequest(arg) {
  if (!(arg instanceof user_pb.VerifyRequest)) {
    throw new Error('Expected argument of type user.VerifyRequest')
  }
  return Buffer.from(arg.serializeBinary())
}

function deserialize_user_VerifyRequest(buffer_arg) {
  return user_pb.VerifyRequest.deserializeBinary(new Uint8Array(buffer_arg))
}

function serialize_user_VerifyResponse(arg) {
  if (!(arg instanceof user_pb.VerifyResponse)) {
    throw new Error('Expected argument of type user.VerifyResponse')
  }
  return Buffer.from(arg.serializeBinary())
}

function deserialize_user_VerifyResponse(buffer_arg) {
  return user_pb.VerifyResponse.deserializeBinary(new Uint8Array(buffer_arg))
}

var UserServiceService = (exports.UserServiceService = {
  verify: {
    path: '/user.UserService/Verify',
    requestStream: false,
    responseStream: false,
    requestType: user_pb.VerifyRequest,
    responseType: user_pb.VerifyResponse,
    requestSerialize: serialize_user_VerifyRequest,
    requestDeserialize: deserialize_user_VerifyRequest,
    responseSerialize: serialize_user_VerifyResponse,
    responseDeserialize: deserialize_user_VerifyResponse,
  },
})

exports.UserServiceClient = grpc.makeGenericClientConstructor(UserServiceService)
