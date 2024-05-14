package com.mostafa.gradproject2.model.apiModel.AppointmentModel

data class Data(
    val date: String,
    val day: String,
    var from: String,
    val id: Int,
    val img: String,
    val name: String,
    var to: String,
    val type: String
)