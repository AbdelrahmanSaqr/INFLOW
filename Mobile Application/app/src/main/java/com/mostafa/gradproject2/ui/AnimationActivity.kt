package com.mostafa.gradproject2.ui

import android.content.Intent
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.os.Handler
import android.view.animation.Animation
import android.view.animation.AnimationUtils
import android.widget.ImageView
import android.widget.TextView
import com.mostafa.gradproject2.R
import com.mostafa.gradproject2.ui.fragments.LoginFragment

class animationActivity : AppCompatActivity() {
    private lateinit var imageview: ImageView
    private lateinit var textView: TextView
    private lateinit var top: Animation
    private lateinit var bottom: Animation
    private val SPLASH_SCREEN = 1250
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_animation)
        imageview = findViewById(R.id.Logo_image)
        textView = findViewById(R.id.title_textView)

        top = AnimationUtils.loadAnimation(this, R.anim.top)
        bottom = AnimationUtils.loadAnimation(this, R.anim.bottom)
        imageview.animation = top
        textView.animation = bottom

        Handler().postDelayed({
            val intent = Intent(this@animationActivity, MainActivity::class.java)
            startActivity(intent)
            finish()
        }, SPLASH_SCREEN.toLong())
    }
}

