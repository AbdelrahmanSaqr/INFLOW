package com.mostafa.gradproject2.ui.fragments

import android.os.Bundle
import android.text.Editable
import androidx.fragment.app.Fragment
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.TextView
import androidx.core.os.bundleOf
import androidx.navigation.findNavController
import androidx.navigation.fragment.findNavController
import com.bumptech.glide.Glide
import com.bumptech.glide.load.resource.bitmap.CenterCrop
import com.bumptech.glide.load.resource.bitmap.RoundedCorners
import com.mostafa.gradproject2.R
import com.mostafa.gradproject2.databinding.FragmentMeetingDetailsBinding
import com.mostafa.gradproject2.databinding.FragmentSearchMeetingBinding


class MeetingDetailsFragment : Fragment() {

    private lateinit var binding: FragmentMeetingDetailsBinding
    val args = arguments
    var patientImage: String? = null


    override fun onCreateView(
        inflater: LayoutInflater,
        container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        binding = FragmentMeetingDetailsBinding.inflate(inflater, container, false)
        binding.backImageview.setOnClickListener{

            val navController = findNavController()
            navController.popBackStack()

        }

        val view = binding.root

        // Inflate the layout for this fragment


        // Retrieve the arguments bundle
        val args = arguments

        // Check if the arguments bundle is not null
        if (args != null) {
            // Extract the patient details from the arguments bundle
            val patientAge = args.getString("patientAge")
            val currentCity = args.getString("currentCity")
            val email = args.getString("email")
            val gender = args.getString("gender")
            val name = args.getString("name")
            val originalCity = args.getString("originalCity")
            val patientImage = args.getString("patientImage")
            val patientId = args.getInt("patientId")
            val phoneNumber = args.getString("phoneNumber")
            val status = args.getString("status")
            val app_id=args.getString("app_id")

            // Use the patient details as needed
            // For example, set text to TextViews or load patient image using patientImage

            // Example: Set patient name to a TextView
            binding.AgeEditText.text= Editable.Factory.getInstance().newEditable(patientAge)
            binding.birthCityEditView.text=Editable.Factory.getInstance().newEditable(originalCity)
            binding.CurrentCityEditText.text=Editable.Factory.getInstance().newEditable(currentCity)
            binding.emailEditText.text=Editable.Factory.getInstance().newEditable(email)
            binding.GenderEditText.text=Editable.Factory.getInstance().newEditable(gender)
            binding.phoneEditText.text=Editable.Factory.getInstance().newEditable(phoneNumber)
            binding.StatusEditText.text=Editable.Factory.getInstance().newEditable(status)
            binding.patientNameTextView.text=name
            Glide.with(requireContext())
                .load("https://backend.inflow2023.online/$patientImage")
                .transform(CenterCrop(), RoundedCorners(100))
                .override(150, 150) // Specify the desired width and height for resizing
                .into(binding.patientShapeableImageView)


            val bundle = bundleOf(
                "patientAge" to patientAge,
                "currentCity" to currentCity,
                "email" to email,
                "gender" to gender,
                "name" to name,
                "originalCity" to originalCity,
                "patientImage" to patientImage,
                "patientId" to patientId,
                "phoneNumber" to phoneNumber,
                "status" to status,
                "app_id" to app_id
            )


            binding.rememberMeTxtView.setOnClickListener{
                view?.findNavController()?.navigate(
                    R.id.action_meetingDetailsFragment_to_remember_fragment,
                    bundle
                )
            }
            binding.addNotesBtn.setOnClickListener{
                view?.findNavController()?.navigate(
                    R.id.action_meetingDetailsFragment_to_addNotesFragment,
                    bundle
                )
            }


        }


        return view
    }
}