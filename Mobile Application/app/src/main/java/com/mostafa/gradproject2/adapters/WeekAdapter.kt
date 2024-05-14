import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.TextView
import androidx.recyclerview.widget.RecyclerView
import com.mostafa.gradproject2.R
import com.mostafa.gradproject2.model.WeekModel

class WeekAdapter(private val weekList: List<WeekModel>) : RecyclerView.Adapter<WeekAdapter.ViewHolder>() {
    private var clickListener: ItemClickListener? = null

    fun setItemClickListener(itemClickListener: ItemClickListener) {
        this.clickListener = itemClickListener
    }

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): ViewHolder {
        val view = LayoutInflater.from(parent.context).inflate(R.layout.days_recycle_item, parent, false)
        return ViewHolder(view)
    }

    override fun onBindViewHolder(holder: ViewHolder, position: Int) {
        val week = weekList[position]
        holder.weekNameTextView.text = week.weekName
        holder.weekDateTextView.text = week.weekDate


    }

    override fun getItemCount(): Int {
        return weekList.size
    }

    inner class ViewHolder(itemView: View) : RecyclerView.ViewHolder(itemView) {
        val weekNameTextView: TextView = itemView.findViewById(R.id.days_txtView)
        val weekDateTextView: TextView = itemView.findViewById(R.id.date_txt)
        init {
            itemView.setOnClickListener {
                val week = weekList[adapterPosition]
                clickListener?.onItemClick(week.weekDate)


            }
        }
    }

    interface ItemClickListener {
        fun onItemClick(date: String)
    }
}
