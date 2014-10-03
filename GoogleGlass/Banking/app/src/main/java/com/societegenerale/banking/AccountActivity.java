package com.societegenerale.banking;

import com.google.android.glass.media.Sounds;
import com.google.android.glass.widget.CardBuilder;
import com.google.android.glass.widget.CardScrollAdapter;
import com.google.android.glass.widget.CardScrollView;

import android.app.Activity;
import android.content.Context;
import android.hardware.Sensor;
import android.hardware.SensorEvent;
import android.hardware.SensorEventListener;
import android.hardware.SensorManager;
import android.media.AudioManager;
import android.os.Bundle;
import android.util.Log;
import android.view.Menu;
import android.view.MenuItem;
import android.view.View;
import android.view.ViewGroup;
import android.widget.AdapterView;

import java.lang.reflect.Array;
import java.util.ArrayList;
import java.util.List;
import java.util.Set;

/**
 * An {@link Activity} showing a tuggable "Hello World!" card.
 * <p>
 * The main content view is composed of a one-card {@link CardScrollView} that provides tugging
 * feedback to the user when swipe gestures are detected.
 * If your Glassware intends to intercept swipe gestures, you should set the content view directly
 * and use a {@link com.google.android.glass.touchpad.GestureDetector}.
 * @see <a href="https://developers.google.com/glass/develop/gdk/touch">GDK Developer Guide</a>
 */
public class AccountActivity extends Activity implements SensorEventListener {

    /** {@link CardScrollView} to use as the main content view. */
    private CardScrollView mCardScroller;

    private ArrayList<View> views;
    private SensorManager sensorManager;
    private Sensor sensor;

    @Override
    protected void onCreate(Bundle bundle) {
        super.onCreate(bundle);

        views = new ArrayList<View>();
        for (int i = 0;  i < 11; i++) {
            View view = buildView(i);
            views.add(view);
        }

        mCardScroller = new CardScrollView(this);
        mCardScroller.setAdapter(new CardScrollAdapter() {
            @Override
            public int getCount() {
                return 10;
            }

            @Override
            public Object getItem(int position) {
                return views.get(position);
            }

            @Override
            public View getView(int position, View convertView, ViewGroup parent) {
                return views.get(position);
            }

            @Override
            public int getPosition(Object item) {
                return 0;
            }
        });
        // Handle the TAP event.
        mCardScroller.setOnItemClickListener(new AdapterView.OnItemClickListener() {
            @Override
            public void onItemClick(AdapterView<?> parent, View view, int position, long id) {
                openOptionsMenu();
            }
        });
        setContentView(mCardScroller);



        sensorManager = (SensorManager) this.getSystemService(Context.SENSOR_SERVICE);
        sensor = sensorManager.getDefaultSensor(Sensor.TYPE_ROTATION_VECTOR);
        sensorManager.registerListener(this, sensor, SensorManager.SENSOR_DELAY_FASTEST);


    }


    @Override
    public boolean onCreateOptionsMenu(Menu menu) {
        super.onCreateOptionsMenu(menu);
        menu.add("Transfert");
        return true;
    }

    @Override
    protected void onResume() {
        super.onResume();
        mCardScroller.activate();
    }

    @Override
    protected void onPause() {
        mCardScroller.deactivate();
        super.onPause();
    }

    /**
     * Builds a Glass styled "Hello World!" view using the {@link CardBuilder} class.
     */
    private View buildView(int position) {
        CardBuilder card = new CardBuilder(this, CardBuilder.Layout.AUTHOR);
        card.setHeading("My Bank Account #"+ position);
        card.setText("Amount " + (100 * position) +"€");
        return card.getView();
    }

    @Override
    public void onSensorChanged(SensorEvent sensorEvent) {
        Log.e("DEMO", "The Head has moved");
    }

    @Override
    public void onAccuracyChanged(Sensor sensor, int i) {

    }
}
