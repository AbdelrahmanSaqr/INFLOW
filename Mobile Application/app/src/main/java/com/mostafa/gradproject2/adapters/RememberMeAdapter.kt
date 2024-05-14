package com.mostafa.gradproject2.adapters

import android.icu.text.SimpleDateFormat
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.TextView
import androidx.recyclerview.widget.RecyclerView
import com.mostafa.gradproject2.R
import com.mostafa.gradproject2.model.apiModel.RememberMeModel.Data
import io.github.glailton.expandabletextview.ExpandableTextView
import java.util.*

class RememberMeAdapter(private var appointments: List<Data>) : RecyclerView.Adapter<RememberMeAdapter.ViewHolder>() {

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): ViewHolder {
        val view = LayoutInflater.from(parent.context).inflate(R.layout.remember_me_item, parent, false)
        return ViewHolder(view)
    }

    override fun onBindViewHolder(holder: ViewHolder, position: Int) {
        val appointment = appointments[position]
        holder.bind(appointment)
    }

    override fun getItemCount(): Int {
        return appointments.size
    }

    fun setAppointments(appointments: List<Data>) {
        this.appointments = appointments
        notifyDataSetChanged()
    }

    inner class ViewHolder(itemView: View) : RecyclerView.ViewHolder(itemView) {
        private val date: TextView = itemView.findViewById(R.id.date1_txt)
        val meetingNotes: TextView = itemView.findViewById(R.id.meeting_notes_expandebletxtView)

        fun bind(appointment: Data) {
            val formattedDate = formatDate(appointment.date)
            date.text = formattedDate

            if (appointment.note != null && appointment.note.isNotEmpty()) {
                meetingNotes.text = appointment.note
            } else {
                meetingNotes.text = "No notes taken"
            }
        }
    }
    private fun formatDate(date: String): String {
        val inputFormat = SimpleDateFormat("yyyy-MM-dd", Locale.getDefault())
        val outputFormat = SimpleDateFormat("dd-MM-yyyy", Locale.getDefault())
        val parsedDate = inputFormat.parse(date)
        return outputFormat.format(parsedDate!!)
    }
}