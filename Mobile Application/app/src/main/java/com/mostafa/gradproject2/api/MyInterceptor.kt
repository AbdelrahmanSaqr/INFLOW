package com.mostafa.gradproject2.api

import okhttp3.Interceptor
import okhttp3.Response



// this code it for pass the access token every request
class MyInterceptor(var accessToken: String) : Interceptor {
    override fun intercept(chain: Interceptor.Chain): Response {
        val request = chain.request()
            .newBuilder()
            .addHeader("Authorization", "Bearer $accessToken")
            .build()
        return chain.proceed(request)
    }
}