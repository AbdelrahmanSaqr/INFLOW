package com.mostafa.gradproject2.model.apiModel.LoginModel

data class User(
    val created_at: String,
    val email: String,
    val email_verified_at: String,
    val id: Int,
    val img: String,
    val name: String,
    val phone_num: Any,
    val type: String,
    val updated_at: String
)