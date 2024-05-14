package com.mostafa.gradproject2.ui

import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.view.View
import android.widget.Button
import androidx.navigation.findNavController
import androidx.navigation.ui.setupWithNavController
import com.google.android.material.bottomnavigation.BottomNavigationView
import com.mostafa.gradproject2.R
import com.mostafa.gradproject2.databinding.ActivityMainBinding


class MainActivity : AppCompatActivity() {


    private lateinit var binding: ActivityMainBinding

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding=ActivityMainBinding.inflate(layoutInflater)
        setContentView(binding.root)

        val navController=findNavController(R.id.NavHostFragment)






        //set up the bottom navi bar
        //let the navi view invisiable
        navController.addOnDestinationChangedListener { _, destination, _ ->
            if(destination.id == R.id.fragmentLogin) {

                binding.bottomNavigationView.visibility = View.GONE
            } else {

                binding.bottomNavigationView.visibility = View.VISIBLE
            }

        }

        binding.bottomNavigationView.setupWithNavController(navController)

        }







    }
