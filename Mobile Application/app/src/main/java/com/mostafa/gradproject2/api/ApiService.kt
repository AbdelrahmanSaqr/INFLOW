package com.mostafa.gradproject2.api

import com.mostafa.gradproject2.model.apiModel.AddNoteModel.AddNoteRequest
import com.mostafa.gradproject2.model.apiModel.AddNoteModel.AddNoteResponse
import com.mostafa.gradproject2.model.apiModel.AppointmentModel.AppointmentResponse
import com.mostafa.gradproject2.model.apiModel.LoginModel.LoginRequest
import com.mostafa.gradproject2.model.apiModel.LoginModel.LoginResponse
import com.mostafa.gradproject2.model.apiModel.PatientModel.PatientDetails
import com.mostafa.gradproject2.model.apiModel.RememberMeModel.RememberMeResponse
import com.mostafa.gradproject2.model.apiModel.profileModel.ProfileResponse
import com.mostafa.gradproject2.model.apiModel.profileModel.updateProfileRequest
import com.mostafa.gradproject2.model.apiModel.profileModel.updateProfileResponse
import retrofit2.Call
import retrofit2.http.*

interface ApiService {


    @POST("auth/login")
    fun login (@Body request: LoginRequest): Call<LoginResponse>

    @GET("doctor_appointments")
    fun getAppointments():Call<AppointmentResponse>

    @GET("appointment/{id}")
    fun getPatientDetails(@Path("id") appointmentId: String): Call<PatientDetails>

    @POST("appointment/note")
    fun addnote(@Body request: AddNoteRequest):Call<AddNoteResponse>

    @GET("patientAppointments/{id}")
    fun getLastMeetings(@Path("id") patientId: String): Call<RememberMeResponse>

    @GET("doctor/profile")
    fun getDoctorData():Call<ProfileResponse>

    @POST("doctor/profile/edit")
    fun updateProfileData(@Body request: updateProfileRequest):Call<updateProfileResponse>





}
