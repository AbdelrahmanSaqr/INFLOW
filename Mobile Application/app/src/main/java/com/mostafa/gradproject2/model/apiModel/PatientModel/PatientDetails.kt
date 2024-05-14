package com.mostafa.gradproject2.model.apiModel.PatientModel

import com.mostafa.gradproject2.model.apiModel.PatientModel.DataX

data class PatientDetails(
    val `data`: DataX,
    val message: String,
    val status: Int
)