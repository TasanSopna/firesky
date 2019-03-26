package com.nutimesheetapp;

import com.facebook.react.ReactPackage;
import java.util.Arrays;
import com.reactlibrary.googlesignin.RNGoogleSignInPackage;
import android.support.annotation.Nullable;
import com.reactnativenavigation.NavigationApplication;
import java.util.List;
import com.oblador.vectoricons.VectorIconsPackage;

public class MainApplication extends NavigationApplication {
    @Override
    public boolean isDebug() {
        return BuildConfig.DEBUG;
    }

    protected List<ReactPackage> getPackages() {
         // Add additional packages you require here
         // No need to add RnnPackage and MainReactPackage
         return Arrays.<ReactPackage>asList(
              new RNGoogleSignInPackage(),
			  new VectorIconsPackage()
         );
	}
	 @Override
     public List<ReactPackage> createAdditionalReactPackages() {
         return getPackages();
     }
    @Override
    public String getJSMainModuleName() {
        return "index";
    }
}