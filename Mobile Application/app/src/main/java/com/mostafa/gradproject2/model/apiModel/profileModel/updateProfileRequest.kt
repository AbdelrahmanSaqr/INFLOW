package com.mostafa.gradproject2.model.apiModel.profileModel

import okhttp3.MultipartBody

data class updateProfileRequest(
    val phone_num:String,
    val img: MultipartBody.Part?,
    val info:String,
    val bio:String )
