package com.mostafa.gradproject2.model.apiModel.profileModel

data class User(
    val created_at: String,
    val email: String,
    val email_verified_at: Any,
    val id: Int,
    val img: String,
    val name: String,
    val phone_num: String,
    val type: String,
    val updated_at: String
)