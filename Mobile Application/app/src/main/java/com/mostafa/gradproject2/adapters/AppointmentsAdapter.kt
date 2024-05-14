package com.mostafa.gradproject2.adapters

import android.icu.text.SimpleDateFormat
import android.icu.util.Calendar
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.view.animation.AnimationUtils.loadLayoutAnimation
import android.widget.TextView
import androidx.constraintlayout.widget.ConstraintLayout
import androidx.core.content.ContextCompat
import androidx.recyclerview.widget.RecyclerView
import com.bumptech.glide.Glide
import android.view.animation.AnimationUtils
import com.google.android.material.imageview.ShapeableImageView
import com.mostafa.gradproject2.R
import com.mostafa.gradproject2.model.apiModel.AppointmentModel.Data
import java.util.*


class AppointmentAdapter(
    private val appointments: List<Data>,
    private val clickListener: AppointmentClickListener
) : RecyclerView.Adapter<AppointmentAdapter.ViewHolder>() {

    inner class ViewHolder(itemView: View) : RecyclerView.ViewHolder(itemView) {
        private val patientNameTextView: TextView = itemView.findViewById(R.id.patientName_TextView)
        private val toTextView: TextView = itemView.findViewById(R.id.to_TextView)
        private val fromTextView: TextView = itemView.findViewById(R.id.from_TextView)
        private val typeTextView: TextView = itemView.findViewById(R.id.type_Textview)
        private val patientImage: ShapeableImageView =
            itemView.findViewById(R.id.patient_shapableImageView)

        fun bind(appointment: Data) {
            patientNameTextView.text = appointment.name
            toTextView.text = appointment.from
            fromTextView.text = appointment.to
            typeTextView.text = appointment.type

            val formatter = SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss.SSSSSS'Z hh:mma'", Locale.getDefault())
            val currentTime = Calendar.getInstance().time

            val currentDateTime = formatter.format(currentTime)
            val currentDateTimeParsed = formatter.parse(currentDateTime)
            val appointmentDateTime = formatter.parse(appointment.date + " " + appointment.from)

            if (currentDateTimeParsed != null && appointmentDateTime != null && currentDateTimeParsed.before(
                    appointmentDateTime
                )
            ) {
                // Current date and time is after the appointment's date and time
                // Do something here, e.g., change the text color or background
                itemView.findViewById<TextView>(R.id.meeting_state_txt).text = "In process"
                // Change text color
                val textColor = ContextCompat.getColor(itemView.context, R.color.black)
                itemView.findViewById<TextView>(R.id.patientName_TextView).setTextColor(textColor)
                itemView.findViewById<TextView>(R.id.to_TextView).setTextColor(textColor)
                itemView.findViewById<TextView>(R.id.from_TextView).setTextColor(textColor)
                itemView.findViewById<TextView>(R.id.type_Textview).setTextColor(textColor)
                itemView.findViewById<TextView>(R.id.meeting_state_txt).setTextColor(textColor)
                itemView.findViewById<TextView>(R.id.dash_TextView).setTextColor(textColor)

                // Change background color
                val backgroundColor = ContextCompat.getColor(itemView.context, R.color.yellow)
                itemView.findViewById<ShapeableImageView>(R.id.redDot_imageView)
                    .setBackgroundColor(backgroundColor)
                itemView.findViewById<ConstraintLayout>(R.id.card_layout).backgroundTintList =
                    ContextCompat.getColorStateList(itemView.context, R.color.white)
            }

            // Load the image URL using Glide
            Glide.with(itemView.context)
                .load("https://backend.inflow2023.online/${appointment.img}")
                .into(patientImage)

            // Set click listener
            itemView.setOnClickListener {
                clickListener.onAppointmentClicked(appointment)
            }
        }
    }

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): ViewHolder {
        val itemView = LayoutInflater.from(parent.context)
            .inflate(R.layout.meeting_recycle_item, parent, false)
        return ViewHolder(itemView)
    }

    override fun onBindViewHolder(holder: ViewHolder, position: Int) {
        val appointment = appointments[position]
        holder.bind(appointment)
    }

    override fun getItemCount(): Int {
        return appointments.size
    }

    interface AppointmentClickListener {
        fun onAppointmentClicked(appointment: Data)
    }
    fun applyLayoutAnimation(recyclerView: RecyclerView) {
        val context = recyclerView.context
        val controller = loadLayoutAnimation(context, R.anim.layout_animation)
        recyclerView.layoutAnimation = controller
        recyclerView.scheduleLayoutAnimation()
    }
}
