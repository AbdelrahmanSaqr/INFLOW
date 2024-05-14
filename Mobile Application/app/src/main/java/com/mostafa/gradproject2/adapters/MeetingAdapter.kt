package com.mostafa.gradproject2.adapters

import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.TextView
import androidx.recyclerview.widget.RecyclerView
import com.google.android.material.imageview.ShapeableImageView
import com.mostafa.gradproject2.R
import com.mostafa.gradproject2.model.Meeting_dataclass

class meetingAdapter
   (private val meetingList:ArrayList<Meeting_dataclass>):RecyclerView.Adapter<meetingAdapter.MyViewHolder>() {
    private lateinit var mLisntener :onItemClickLisntener
    // click 1
    interface onItemClickLisntener{
        fun onItemClick(position: Int)
    }
    //click 2
    fun setOnItemClickLisntener(lisntener: onItemClickLisntener){
        mLisntener=lisntener
    }


    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): MyViewHolder {
            val itemView = LayoutInflater.from(parent.context)
                .inflate(R.layout.meeting_recycle_item, parent, false)
            //click 5
            return MyViewHolder(itemView,mLisntener)
    }

    override fun onBindViewHolder(holder: MyViewHolder, position: Int) {
        val currentItem = meetingList[position]
        holder.patientImageView.setImageResource(currentItem.image)
        holder.meetingNum.text = currentItem.meetingNum
        holder.meetingDate.text = currentItem.meetingDate
        holder.meetingState.text = currentItem.meetingState
        holder.patientName.text = currentItem.patientName
    }

    override fun getItemCount(): Int {

        return meetingList.size
    }

    class MyViewHolder(itemView: View,lisntener: onItemClickLisntener ) : RecyclerView.ViewHolder(itemView) {
        val patientImageView: ShapeableImageView =
            itemView.findViewById(R.id.patient_shapableImageView)
        val patientName: TextView = itemView.findViewById(R.id.patientName_TextView)
        val meetingNum: TextView = itemView.findViewById(R.id.type_Textview)
        val meetingDate: TextView = itemView.findViewById(R.id.date_txt)
        val meetingState: TextView = itemView.findViewById(R.id.meeting_state_txt)

        init {
            itemView.setOnClickListener{
                lisntener.onItemClick(adapterPosition)
            }

        }


    }
}