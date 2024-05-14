package com.mostafa.gradproject2.ui.fragments

import android.app.Activity
import android.content.Context
import android.content.Intent
import android.net.Uri
import android.os.Bundle
import android.text.Editable
import android.util.Log
import androidx.fragment.app.Fragment
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.Toast
import com.bumptech.glide.Glide
import com.bumptech.glide.load.resource.bitmap.CenterCrop
import com.bumptech.glide.load.resource.bitmap.RoundedCorners
import com.github.dhaval2404.imagepicker.ImagePicker

import com.mostafa.gradproject2.api.RetrofitInstance
import com.mostafa.gradproject2.databinding.FragmentProfileBinding
import com.mostafa.gradproject2.model.apiModel.profileModel.ProfileResponse
import com.mostafa.gradproject2.model.apiModel.profileModel.updateProfileRequest
import com.mostafa.gradproject2.model.apiModel.profileModel.updateProfileResponse
import okhttp3.MediaType.Companion.toMediaTypeOrNull
import okhttp3.MultipartBody
import okhttp3.RequestBody.Companion.asRequestBody
import retrofit2.Call
import retrofit2.Callback
import retrofit2.Response
import java.io.File
import java.io.IOException


class ProfileFragment : Fragment() {
    private lateinit var binding: FragmentProfileBinding
    private var selectedImageUri: Uri? = null

    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        binding = FragmentProfileBinding.inflate(layoutInflater)

        // Retrieve and display doctor profile data
        getDoctorData()

        // Image picker




        return binding.root
    }




    private fun enableProfileEditing(enabled: Boolean) {
        with(binding) {
            nameEditText.isEnabled = enabled
            phoneEditText.isEnabled = enabled
            bioEditText.isEnabled = enabled
            infoEditText.isEnabled = enabled
        }
    }

    private fun getDoctorData() {
        RetrofitInstance.apiInterface.getDoctorData().enqueue(object : Callback<ProfileResponse?> {
            override fun onResponse(
                call: Call<ProfileResponse?>,
                response: Response<ProfileResponse?>
            ) {
                if (response.isSuccessful && response.body() != null) {
                    val profileData = response.body()!!.data
                    with(binding) {
                        nameEditText.text = Editable.Factory.getInstance().newEditable(profileData.name)
                        phoneEditText.text = Editable.Factory.getInstance().newEditable(profileData.phone_num)
                        infoEditText.text = Editable.Factory.getInstance().newEditable(profileData.info)
                        bioEditText.text = Editable.Factory.getInstance().newEditable(profileData.bio)
                    }
                    Glide.with(requireContext())
                        .load("https://backend.inflow2023.online/${profileData.img}")
                        .transform(CenterCrop(), RoundedCorners(100))
                        .override(150, 150)
                        .into(binding.doctorProfileShapeableImage)
                }
            }

            override fun onFailure(call: Call<ProfileResponse?>, t: Throwable) {
                Toast.makeText(requireContext(), "Failed to retrieve profile data", Toast.LENGTH_SHORT).show()
            }
        })
    }


}