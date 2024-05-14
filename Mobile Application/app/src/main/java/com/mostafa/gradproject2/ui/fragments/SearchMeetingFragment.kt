package com.mostafa.gradproject2.ui.fragments

import android.app.DatePickerDialog
import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.SearchView
import android.widget.Toast
import androidx.fragment.app.Fragment
import androidx.recyclerview.widget.LinearLayoutManager
import androidx.recyclerview.widget.RecyclerView
import com.mostafa.gradproject2.R
import com.mostafa.gradproject2.adapters.SearchMeetingAdapter
import com.mostafa.gradproject2.databinding.FragmentSearchMeetingBinding
import com.mostafa.gradproject2.model.SearchMeeting_dataclass
import java.text.SimpleDateFormat
import java.util.*


class SearchMeetingFragment : Fragment() {
    private lateinit var newRecycleView:RecyclerView
    private lateinit var newArrayList:ArrayList<SearchMeeting_dataclass>
    private lateinit var patientImage:Array<Int>
    private lateinit var patientName1:Array<String>
    private lateinit var meetingNum:Array<String>
    private lateinit var meetingState:Array<String>
    private lateinit var meetingDate:Array<String>
    private lateinit var meetingNotes:Array<String>
    private lateinit var binding: FragmentSearchMeetingBinding
    private lateinit var searchView: SearchView
    private lateinit var adapter: SearchMeetingAdapter


    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        // Inflate the layout for this fragment
        binding=FragmentSearchMeetingBinding.inflate(layoutInflater)
        //date picker
        DatePickerDialog(requireActivity(),)
        val myCalendar=Calendar.getInstance()

        val datePicker=DatePickerDialog.OnDateSetListener { view, year, month, dayOfMonth ->
            myCalendar.set(Calendar.YEAR, year)
            myCalendar.set(Calendar.MONTH, month)
            myCalendar.set(Calendar.DAY_OF_MONTH, dayOfMonth)
            updatelable(myCalendar)
        }


        binding.calenderShapeableImageView.setOnClickListener{
            binding.dateTxt.visibility=View.VISIBLE
            DatePickerDialog(requireContext(),datePicker,myCalendar.get(Calendar.YEAR),
                    myCalendar.get(Calendar.MONTH),
                    myCalendar.get(Calendar.DAY_OF_MONTH)).show()
        }



        //search
        searchView=binding.MeetingSearchView
        searchView.clearFocus()
        searchView.setOnQueryTextListener(object :SearchView.OnQueryTextListener{
            override fun onQueryTextSubmit(p0: String?): Boolean {
                return false
            }

            override fun onQueryTextChange(newText: String?): Boolean {
                filterList(newText)
                return true
            }

        })


        // setting the arrays to the list
        patientImage= arrayOf(
            R.drawable.doctor, R.drawable.patient1, R.drawable.patient2, R.drawable.patient3,
            R.drawable.doctor
        )

        patientName1= arrayOf(
            "Eman ahmed",
            "mostafa ali",
            "salama-+ mahmoud",
            "Mohammed Selim",
            "ahmed alaa"
        )
        meetingNum= arrayOf(
            "online",
            "online",
            "offline",
            "online",
            "offline",
        )
        meetingState= arrayOf(
            "Finished",
            "Finished",
            "Finished",
            "Finished",
            "Finished",
        )
        meetingDate= arrayOf(
            "11:00 pm-12:00 pm",
            "12:00 pm-1:00 pm",
            "2:00 pm-3:00 pm",
            "4:00 pm-5:00 pm",
            "6:00 pm-7:00 pm",

            )
        meetingNotes= arrayOf(
            "Therapist’s observations, hypotheses, feelings, or thoughts about the session Do not include information or data on a patient’s medical history, treatment plan, or diagnoses Document insights on patient and therapy Inform treatment play See more...11:00 pm-12:00 pm11:00 pm-12:00 pm11:00 pm-12:00 pm11:00 pm-12:00 pm11:00 pm-12:00 pm11:00 pm-12:00 pm11:00 pm-12:00 pm11:00 pm-12:00 pm11:00 pm-12:00 pm11:00 pm-12:00 pm",
            "Therapist’s observations, hypotheses, feelings, or thoughts about the session Do not include information or data on a patient’s medical history, treatment plan, or diagnoses Document insights on patient and therapy Inform treatment play See more..." ,
            "Therapist’s observations, hypotheses, feelings, or thoughts about the session Do not include information or data on a patient’s medical history, treatment plan, or diagnoses Document insights on patient and therapy Inform treatment play See more...",
            "Therapist’s observations, hypotheses, feelings, or thoughts about the session Do not include information or data on a patient’s medical history, treatment plan, or diagnoses Document insights on patient and therapy Inform treatment play See more...",
            "Therapist’s observations, hypotheses, feelings, or thoughts about the session Do not include information or data on a patient’s medical history, treatment plan, or diagnoses Document insights on patient and therapy Inform treatment play See more..."
        )
        newArrayList= arrayListOf()
        newRecycleView=binding.searchMeetingRecyclerView
        newRecycleView.layoutManager= LinearLayoutManager(this.context)

        adapter=SearchMeetingAdapter(newArrayList)
        newRecycleView.adapter=adapter



        getUserdata()
        return binding.root
    }

    fun updatelable(myCalender:Calendar){
        val myFormat= "dd-MM-yyyy"
        val sdf =SimpleDateFormat(myFormat,Locale.UK)
        binding.dateTxt.setText(sdf.format(myCalender.time))
    }

    // filterList for the searchView
    private fun filterList(query:String?) {

        if (query != null) {
            val filterList = ArrayList<SearchMeeting_dataclass>()
            for (i in newArrayList) {
                if (i.patientName.lowercase(Locale.ROOT).contains(query)) {
                    filterList.add(i)
                }
            }
            if (filterList.isEmpty()) {
                Toast.makeText(this.context, "no data found", Toast.LENGTH_SHORT).show()
            } else {
                adapter.setFilterList(filterList)
            }

        }
    }




    private fun getUserdata() {
        for (i in patientImage.indices){
            val  patientName= SearchMeeting_dataclass(patientImage[i],patientName1[i],meetingNum[i],meetingDate[i],meetingState[i],meetingNotes[i])
            newArrayList.add(patientName)

        }

    }


}





