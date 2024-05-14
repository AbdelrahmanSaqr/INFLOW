package com.mostafa.gradproject2.adapters

import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.TextView
import androidx.recyclerview.widget.RecyclerView
import com.google.android.material.imageview.ShapeableImageView
import com.mostafa.gradproject2.R
import com.mostafa.gradproject2.model.SearchMeeting_dataclass
import io.github.glailton.expandabletextview.ExpandableTextView


class SearchMeetingAdapter
    (private var meetingNotesList:ArrayList<SearchMeeting_dataclass>):RecyclerView.Adapter<SearchMeetingAdapter.MyViewHolder>() {
    //    private lateinit var mLisntener :onItemClickLisntener
//    // click 1
//    interface onItemClickLisntener{
//        fun onItemClick(position: Int)
//    }
//    //click 2
//    fun setOnItemClickLisntener(lisntener: onItemClickLisntener){
//        mLisntener=lisntener
//    }
    fun setFilterList(meetingNotesList:ArrayList<SearchMeeting_dataclass>){
        this.meetingNotesList=meetingNotesList
        notifyDataSetChanged()
    }


    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): MyViewHolder {
        val itemView = LayoutInflater.from(parent.context)
            .inflate(R.layout.search_meeting_item, parent, false)
        //click 5
        return MyViewHolder(itemView)
    }

    override fun onBindViewHolder(holder: MyViewHolder, position: Int){
        val currentItem = meetingNotesList[position]
        holder.patientImageView.setImageResource(currentItem.image)

        holder.meetingNum.text = currentItem.meetingNum
        holder.meetingDate.text = currentItem.meetingDate
        holder.meetingState.text = currentItem.meetingState
        holder.patientName.text = currentItem.patientName
        holder.meetingNotes.text=currentItem.meetingNotes




    }

    override fun getItemCount(): Int {

            return meetingNotesList.size
        }

        class MyViewHolder(itemView: View, ) : RecyclerView.ViewHolder(itemView) {
            val patientImageView: ShapeableImageView =
                itemView.findViewById(R.id.patient_shapableImageView)
            val patientName: TextView = itemView.findViewById(R.id.patientName_TextView)
            val meetingNum: TextView = itemView.findViewById(R.id.type_Textview)
            val meetingDate: TextView = itemView.findViewById(R.id.date_txt)
            val meetingState: TextView = itemView.findViewById(R.id.meeting_state_txt)
            val meetingNotes:ExpandableTextView=itemView.findViewById(R.id.meeting_notes_expandebletxtView)


        }
}