package com.mostafa.gradproject2.ui.fragments

import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.Toast
import androidx.fragment.app.Fragment
import androidx.navigation.fragment.findNavController
import com.mostafa.gradproject2.api.RetrofitInstance
import com.mostafa.gradproject2.databinding.FragmentAddNotesBinding
import com.mostafa.gradproject2.model.apiModel.AddNoteModel.AddNoteRequest
import com.mostafa.gradproject2.model.apiModel.AddNoteModel.AddNoteResponse
import com.mostafa.gradproject2.model.apiModel.profileModel.ProfileResponse
import retrofit2.Call
import retrofit2.Callback
import retrofit2.Response


class AddNotesFragment : Fragment() {
    private lateinit var binding: FragmentAddNotesBinding


    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {

        // Inflate the layout for this fragment
        binding = FragmentAddNotesBinding.inflate(inflater, container, false)
        binding.falseShapleimageView.setOnClickListener{
                val navController = findNavController()
                navController.popBackStack()
            }


        // Retrieve the arguments bundle
        val args = arguments

        // Check if the arguments bundle is not null





        fun addnote() {
            val noteText = binding.addnotesEditText.text.toString()
            if (noteText.isNotEmpty()) {
                val obj = args?.getString("app_id")?.let { AddNoteRequest(it, noteText) }
                obj?.let {
                    RetrofitInstance.apiInterface.addnote(it).enqueue(object : Callback<AddNoteResponse?> {
                        override fun onResponse(call: Call<AddNoteResponse?>, response: Response<AddNoteResponse?>) {
                            val addNoteResponse = response.body()
                            if (addNoteResponse != null) {
                                Toast.makeText(requireContext(), addNoteResponse.message, Toast.LENGTH_LONG).show()
                            } else {
                                Toast.makeText(requireContext(), "Failed to add note.", Toast.LENGTH_LONG).show()
                            }
                        }

                        override fun onFailure(call: Call<AddNoteResponse?>, t: Throwable) {
                            Toast.makeText(requireContext(), "Network error: ${t.message}", Toast.LENGTH_SHORT).show()
                        }
                    })
                }
            } else {
                Toast.makeText(requireContext(), "Note text is empty.", Toast.LENGTH_SHORT).show()
            }
        }
        binding.shapeableImageView2.setOnClickListener{
            addnote()
        }
        return binding.root

    }

    }






