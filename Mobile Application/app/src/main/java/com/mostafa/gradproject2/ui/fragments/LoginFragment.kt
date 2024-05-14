package com.mostafa.gradproject2.ui.fragments

import android.os.Bundle
import androidx.fragment.app.Fragment
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.Toast
import androidx.core.os.bundleOf
import androidx.navigation.findNavController
import com.mostafa.gradproject2.R
import com.mostafa.gradproject2.api.RetrofitInstance
import com.mostafa.gradproject2.databinding.FragmentLoginBinding
import com.mostafa.gradproject2.model.apiModel.LoginModel.LoginRequest
import com.mostafa.gradproject2.model.apiModel.LoginModel.LoginResponse
import retrofit2.Call
import retrofit2.Callback
import retrofit2.Response


class LoginFragment : Fragment() {


    private lateinit var binding: FragmentLoginBinding
    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View {

        binding = FragmentLoginBinding.inflate(inflater, container, false)
        // Inflate the layout for this fragment


        binding.loginBtn.setOnClickListener{
        getdata()

        }




        return binding.root
    }
    private fun getdata(){
        val obj= LoginRequest(binding.emailEdittxt.text.toString(),binding.passwordEditText.text.toString())


        RetrofitInstance.apiInterface.login(obj).enqueue(object : Callback<LoginResponse?> {
            override fun onResponse(
                call: Call<LoginResponse?>,
                response: Response<LoginResponse?>
            ) {
                if (response.isSuccessful && response.body() != null) {
                    val loginResponse = response.body()!!
                    //save the access token
                    val accessToken = loginResponse.access_token
                    // Set the access token in RetrofitInstance
                    RetrofitInstance.setAccessToken(accessToken)
                    val doctorImage=loginResponse.user.img
                    val doctorName=loginResponse.user.name
                    val bundle = bundleOf(
                        "doctorImage" to doctorImage,
                        "doctorName" to doctorName
                    )


                    // Access the properties of loginResponse as needed
                    Toast.makeText(
                        context,
                        "success",
                        //loginResponse.access_token?.toString(),
                        Toast.LENGTH_SHORT
                    ).show()
                    view?.findNavController()?.navigate(R.id.action_fragmentLogin_to_homeFragment,bundle)
                } else {
                    // Handle the error case when the response is not successful or the body is null
                    Toast.makeText(context, "Email or password is incorrect", Toast.LENGTH_SHORT).show()
                }
            }

            override fun onFailure(call: Call<LoginResponse?>, t: Throwable) {
                Toast.makeText(context,t.message, Toast.LENGTH_SHORT).show()
            }
        })
    }

    }




