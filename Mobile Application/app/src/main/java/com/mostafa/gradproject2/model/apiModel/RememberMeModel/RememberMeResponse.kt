package com.mostafa.gradproject2.model.apiModel.RememberMeModel

data class RememberMeResponse(
    val `data`: List<Data>,
    val message: String,
    val status: Int
)