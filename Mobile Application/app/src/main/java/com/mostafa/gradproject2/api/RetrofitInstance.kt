package com.mostafa.gradproject2.api

import okhttp3.OkHttpClient
import retrofit2.Retrofit
import retrofit2.converter.gson.GsonConverterFactory

object RetrofitInstance {



    private val interceptor = MyInterceptor("") // Empty initial access token

    private val okHttpClient = OkHttpClient.Builder()
        .addInterceptor(interceptor)
        .build()



    private val retrofit by lazy {
        Retrofit.Builder().baseUrl("https://backend.inflow2023.online/api/")
            .addConverterFactory(GsonConverterFactory.create())
            .client(okHttpClient)
            .build()


    }
    val apiInterface by lazy {
        retrofit.create(ApiService::class.java)
    }
    fun setAccessToken(accessToken: String) {
        interceptor.accessToken = accessToken
    }
}




