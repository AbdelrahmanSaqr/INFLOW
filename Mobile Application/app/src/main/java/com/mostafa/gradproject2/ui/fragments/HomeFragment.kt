package com.mostafa.gradproject2.ui.fragments

import WeekAdapter
import android.os.Bundle
import androidx.fragment.app.Fragment
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.view.animation.AnimationUtils.loadLayoutAnimation
import android.widget.Toast
import androidx.core.os.bundleOf
import androidx.navigation.findNavController
import androidx.recyclerview.widget.LinearLayoutManager
import androidx.recyclerview.widget.RecyclerView
import com.bumptech.glide.Glide
import com.bumptech.glide.load.resource.bitmap.CenterCrop
import com.bumptech.glide.load.resource.bitmap.RoundedCorners
import com.mostafa.gradproject2.R
import com.mostafa.gradproject2.adapters.AppointmentAdapter
import com.mostafa.gradproject2.api.RetrofitInstance
import com.mostafa.gradproject2.model.WeekModel
import com.mostafa.gradproject2.model.Meeting_dataclass
import com.mostafa.gradproject2.databinding.FragmentHomeBinding
import com.mostafa.gradproject2.model.apiModel.AppointmentModel.AppointmentResponse
import com.mostafa.gradproject2.model.apiModel.AppointmentModel.Data
import com.mostafa.gradproject2.model.apiModel.PatientModel.PatientDetails
import retrofit2.Call
import retrofit2.Callback
import retrofit2.Response
import java.text.SimpleDateFormat
import java.util.*
import kotlin.collections.ArrayList
import android.view.animation.AnimationUtils






class HomeFragment : Fragment(),WeekAdapter.ItemClickListener, AppointmentAdapter.AppointmentClickListener {
    // for the days recycle view
    private lateinit var binding:FragmentHomeBinding
    private lateinit var daysRecycleView: RecyclerView
    //for the meeting recycle view
    private lateinit var AppointmentRecycleView: RecyclerView
    private lateinit var appointmentResponseList: List<Data>
    private var numberofAppointment:Int=0
    private var selectedDate: String=""


    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View {




        //recycle View number 1 (for the Appointments)
        // Inflate the layout for this fragment
        binding = FragmentHomeBinding.inflate(layoutInflater)
        AppointmentRecycleView=binding.meetingRecycleView
        AppointmentRecycleView.layoutManager= LinearLayoutManager(this.context)
        AppointmentRecycleView.setHasFixedSize(true)

        val args = arguments
        if (args != null) {
            val doctorImage = args.getString("doctorImage")
            val doctorName=args.getString("doctorName")
            binding.doctorNameTextView.text=doctorName.toString()




            //setting the doctor image
            Glide.with(requireContext())
                .load("https://backend.inflow2023.online/$doctorImage")
                .transform(CenterCrop(), RoundedCorners(100))
                .override(150, 150) // Specify the desired width and height for resizing
                .into(binding.doctorShapeableImageView)

        }













        //recycleView1(days)

        daysRecycleView=binding.daysRecycleView
        daysRecycleView.layoutManager= LinearLayoutManager(this.context)


        // Get the current week's data
        val calendar = Calendar.getInstance()
        val dateFormat = SimpleDateFormat("EEE", Locale.getDefault())
        val weekList = ArrayList<WeekModel>()
        for (i in 0 until 7) {
            val weekName = dateFormat.format(calendar.time)
            val weekDate = calendar.get(Calendar.DAY_OF_MONTH).toString()
            weekList.add(WeekModel(weekName, weekDate))
            calendar.add(Calendar.DAY_OF_WEEK, 1)
        }
       val weekAdapter=WeekAdapter(weekList)
        daysRecycleView.adapter=weekAdapter
        daysRecycleView.layoutManager=LinearLayoutManager(this.context,LinearLayoutManager.HORIZONTAL,false)
        weekAdapter.setItemClickListener(this)

        //recycleView1(days) end

        return binding.root
    }




    //get data from api
    private fun getAppoinmentdata() {
        if (selectedDate.isNotEmpty()) {
            RetrofitInstance.apiInterface.getAppointments()
                .enqueue(object : Callback<AppointmentResponse?> {
                    override fun onResponse(
                        call: Call<AppointmentResponse?>,
                        response: Response<AppointmentResponse?>
                    ) {
                        if (response.isSuccessful && response.body() != null) {
                            val appointmentResponse = response.body()!!
                            appointmentResponseList = response.body()!!.data

                            // Convert time format
                            appointmentResponseList.forEach { appointment ->
                                appointment.from = convertTimeFormat(appointment.from)
                                appointment.to = convertTimeFormat(appointment.to)
                            }

                            // Filter the data based on selectedDate
                            val filteredList = appointmentResponseList.filter { appointment ->
                                val dateFormat = SimpleDateFormat("yyyy-MM-dd", Locale.getDefault())
                                val appointmentDate =
                                    dateFormat.format(dateFormat.parse(appointment.date))
                                val selectedDateFormat =
                                    dateFormat.format(dateFormat.parse(selectedDate))
                                appointmentDate == selectedDateFormat
                            }

                            // Update the number of appointments
                            numberofAppointment = filteredList.size
                            binding.numberOfAppointmentTextView.text =
                                numberofAppointment.toString()

                            // Set the filtered list in the adapter
                            val appointmentAdapter = AppointmentAdapter(filteredList, this@HomeFragment)
                            AppointmentRecycleView.adapter = appointmentAdapter
                            AppointmentRecycleView.layoutManager = LinearLayoutManager(context)

                            // Apply layout animation
                            val controller = loadLayoutAnimation(context, R.anim.layout_animation)
                            AppointmentRecycleView.layoutAnimation = controller

                            // Start layout animation
                            AppointmentRecycleView.scheduleLayoutAnimation()


                            // This is a success response

                        } else {
                            val errorBody = response.errorBody()?.string()
                            // Handle the error case when the response is not successful
                            Toast.makeText(
                                context,
                                "Request failed: $errorBody",
                                Toast.LENGTH_SHORT
                            ).show()
                        }
                    }

                    override fun onFailure(call: Call<AppointmentResponse?>, t: Throwable) {
                        // Handle network failure
                        Toast.makeText(context, "Network error: ${t.message}", Toast.LENGTH_SHORT)
                            .show()
                    }
                })
        }  else {
        Toast.makeText(requireContext(),"selected date= null",Toast.LENGTH_LONG).show()
    }

    }

    //for convert the time
    fun convertTimeFormat(timeStr: String): String {
        val timeObj = SimpleDateFormat("HH:mm:ss", Locale.getDefault()).parse(timeStr)
        val formattedTime = SimpleDateFormat("h:mma", Locale.getDefault()).format(timeObj)
        return formattedTime.replace("AM", "AM").replace("PM", "PM")
    }


    //on day click
    override fun onItemClick(date: String) {
            val calendar = Calendar.getInstance()
            calendar.set(Calendar.DAY_OF_MONTH, date.toInt())
            val formattedDate = SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss.SSSSSS'Z'", Locale.getDefault()).format(calendar.time)
            selectedDate = formattedDate
            // Use the selectedDate variable as needed

        getAppoinmentdata()
    }


    //on appointment Click
    //get PatientDetails form api
    override fun onAppointmentClicked(appointment: Data) {
        val appointmentId = appointment.id

        RetrofitInstance.apiInterface.getPatientDetails(appointmentId.toString())
            .enqueue(object : Callback<PatientDetails> {
                override fun onResponse(
                    call: Call<PatientDetails>,
                    response: Response<PatientDetails>
                ) {
                    if (response.isSuccessful && response.body() != null) {
                        val patientDetails = response.body()!!
                        val patientAge = patientDetails.data.age
                        val currentCity = patientDetails.data.current_city
                        val email = patientDetails.data.email
                        val gender = patientDetails.data.gender
                        val name = patientDetails.data.name
                        val originalCity = patientDetails.data.original_city
                        val patientImage = patientDetails.data.patient_img
                        val patientId = patientDetails.data.patient_id
                        val phoneNumber = patientDetails.data.phone_num
                        val status = patientDetails.data.status
                        val app_id = patientDetails.data.app_id.toString()


                        // Create a bundle with patient details
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

                        // Navigate to MeetingDetailsFragment with the bundle
                        view?.findNavController()?.navigate(
                            R.id.action_homeFragment_to_meetingDetailsFragment,
                            bundle
                        )
                    } else {
                        val errorBody = response.errorBody()?.string()
                        Toast.makeText(
                            requireContext(),
                            "Request failed: $errorBody",
                            Toast.LENGTH_SHORT
                        ).show()
                    }
                }

                override fun onFailure(call: Call<PatientDetails>, t: Throwable) {
                    Toast.makeText(
                        requireContext(),
                        "Network error: ${t.message}",
                        Toast.LENGTH_SHORT
                    ).show()
                }
            })
    }
    }
//ctrl +shift + space


