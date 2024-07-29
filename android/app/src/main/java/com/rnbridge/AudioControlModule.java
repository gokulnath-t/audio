package com.rnbridge;

import android.content.Context;
import android.media.MediaPlayer;
import android.media.PlaybackParams;
import android.media.session.PlaybackState;
import android.os.Build;
import android.util.Log;

import androidx.annotation.NonNull;
import androidx.annotation.RequiresApi;

import com.facebook.react.bridge.*;
import com.facebook.react.modules.core.DeviceEventManagerModule;

import androidx.media3.common.MediaItem;
import androidx.media3.common.Player;
import androidx.media3.exoplayer.ExoPlayer;
import java.io.File;

public class AudioControlModule extends ReactContextBaseJavaModule {
    private ExoPlayer player;
    private Context context;
    AudioControlModule(ReactApplicationContext context) {
        super(context);
        this.context = context;
    }

    @NonNull
    @Override
    public String getName() {
        return "AudioControl";
    }

    @ReactMethod
    public void check(Integer number) {
        Log.d("hello check", "check: " + number);
    }

    @ReactMethod
    public void play(String filePath, Callback callback) {
        player = new ExoPlayer.Builder(context).build();
        MediaItem mediaItem = MediaItem.fromUri(filePath);
        player.setMediaItem(mediaItem);
        player.addListener(new Player.Listener() {
            @Override
            public void onPlaybackStateChanged(int playbackState) {
                ((ReactContext)context)
                        .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
                        .emit("playerState", playbackState);

//                Player.
                Player.Listener.super.onPlaybackStateChanged(playbackState);
            }
        });

        player.prepare();
        player.play();

    }

    @ReactMethod
    public void pausePlayer(){
        player.pause();
    }


}
