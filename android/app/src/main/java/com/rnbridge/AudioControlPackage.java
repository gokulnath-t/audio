package com.rnbridge;
import androidx.annotation.NonNull;

import com.facebook.react.ReactPackage;
import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;

import com.facebook.react.uimanager.ViewManager;
import java.util.*;

public class AudioControlPackage implements ReactPackage {
    @Override
    public List<ViewManager> createViewManagers(@NonNull ReactApplicationContext reactCon){
        return Collections.emptyList();
    }
    @Override
    public List <NativeModule>createNativeModules(ReactApplicationContext reactCon){
        List<NativeModule> modules = new ArrayList<>();
        modules.add(new AudioControlModule(reactCon));
        return  modules;
    }
}
