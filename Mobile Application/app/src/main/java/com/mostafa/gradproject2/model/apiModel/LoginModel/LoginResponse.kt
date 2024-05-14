package com.mostafa.gradproject2.model.apiModel.LoginModel

data class LoginResponse(
    val access_token: String,
    val expires_in: Int,
    val token_type: String,
    val user: User
)