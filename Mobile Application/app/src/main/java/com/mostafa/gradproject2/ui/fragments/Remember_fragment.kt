package com.mostafa.gradproject2.ui.fragments

import com.mostafa.gradproject2.adapters.RememberMeAdapter
import android.os.Bundle
import androidx.fragment.app.Fragment
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.navigation.fragment.findNavController
import androidx.recyclerview.widget.LinearLayoutManager
import com.bumptech.glide.Glide
import com.bumptech.glide.load.resource.bitmap.CenterCrop
import com.bumptech.glide.load.resource.bitmap.RoundedCorners

import com.mostafa.gradproject2.api.RetrofitInstance
import com.mostafa.gradproject2.databinding.FragmentRememberBinding
import com.mostafa.gradproject2.model.apiModel.RememberMeModel.RememberMeResponse
import retrofit2.Call
import retrofit2.Callback
import retrofit2.Response


class Remember_fragment : Fragment() {
    private lateinit var binding: FragmentRememberBinding
    private lateinit var adapter: RememberMeAdapter


    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View {
        binding = FragmentRememberBinding.inflate(layoutInflater)


        binding.falseShapleimageView.setOnClickListener {
            val navController = findNavController()
            navController.popBackStack()

        }

        adapter = RememberMeAdapter(emptyList())
        binding.lastMeetingRecycleView.layoutManager = LinearLayoutManager(requireContext())
        binding.lastMeetingRecycleView.adapter = adapter

        val args = arguments
        if (args != null) {
            val patientId = args.getInt("patientId")
            val name = args.getString("name")
            val patientImage = args.getString("patientImage")
             binding.patientName1TextView.text=name.toString()
            Glide.with(requireContext())
                .load("https://backend.inflow2023.online/$patientImage")
                .transform(CenterCrop(), RoundedCorners(100))
                .override(250, 250) // Specify the desired width and height for resizing
                .into(binding.patientShapeableImageView)
            getRememberdata(patientId)
        }

        return binding.root
    }

    private fun getRememberdata(patientId: Int) {
        RetrofitInstance.apiInterface.getLastMeetings(patientId.toString())
            .enqueue(object : Callback<RememberMeResponse> {
                override fun onResponse(
                    call: Call<RememberMeResponse>,
                    response: Response<RememberMeResponse>
                ) {
                    if (response.isSuccessful && response.body() != null) {
                        val rememberMeResponse = response.body()!!
                        val appointments = rememberMeResponse.data
                        binding.numberofmeetingTextView.text=("Last "+appointments.size.toString()+" Meeting")

//                        Glide.with(requireContext())
//                            .load("https://backend.inflow2023.online/$patientImage")
//                            .transform(CenterCrop(), RoundedCorners(100))
//                            .override(150, 150) // Specify the desired width and height for resizing
//                            .into(binding.patientShapeableImageView)


                        // Update the adapter with the new list of appointments
                        adapter.setAppointments(appointments)
                    }
                }

                override fun onFailure(call: Call<RememberMeResponse>, t: Throwable) {
                    // Handle the failure case
                }
            })
    }
}