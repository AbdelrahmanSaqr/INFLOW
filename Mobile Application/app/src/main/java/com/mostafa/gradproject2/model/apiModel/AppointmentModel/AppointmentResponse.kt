package com.mostafa.gradproject2.model.apiModel.AppointmentModel

data class AppointmentResponse(
    val `data`: List<Data>,
    val message: String,
    val status: Int
)