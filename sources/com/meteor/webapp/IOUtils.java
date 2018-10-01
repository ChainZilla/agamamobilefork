package com.meteor.webapp;

import java.io.BufferedReader;
import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import okio.BufferedSink;
import okio.Okio;
import okio.Source;

class IOUtils {
    static final /* synthetic */ boolean $assertionsDisabled = (!IOUtils.class.desiredAssertionStatus());
    private static final String LOG_TAG = IOUtils.class.getSimpleName();

    IOUtils() {
    }

    public static String stringFromInputStream(InputStream inputStream) throws IOException {
        if ($assertionsDisabled || inputStream != null) {
            BufferedReader reader = new BufferedReader(new InputStreamReader(inputStream));
            StringBuilder stringBuilder = new StringBuilder();
            while (true) {
                String line = reader.readLine();
                if (line == null) {
                    return stringBuilder.toString();
                }
                stringBuilder.append(line);
                stringBuilder.append("\n");
            }
        } else {
            throw new AssertionError();
        }
    }

    public static void writeToFile(Source source, File file) throws IOException {
        BufferedSink sink = null;
        try {
            sink = Okio.buffer(Okio.sink(file));
            sink.writeAll(source);
        } finally {
            source.close();
            if (sink != null) {
                sink.close();
            }
        }
    }

    public static void writeToFile(byte[] bytes, File file) throws IOException {
        BufferedSink sink = null;
        try {
            sink = Okio.buffer(Okio.sink(file));
            sink.write(bytes);
        } finally {
            if (sink != null) {
                sink.close();
            }
        }
    }

    public static boolean deleteRecursively(File file) {
        if (file.isDirectory()) {
            for (File child : file.listFiles()) {
                if (!deleteRecursively(child)) {
                    return false;
                }
            }
        }
        return file.delete();
    }
}
