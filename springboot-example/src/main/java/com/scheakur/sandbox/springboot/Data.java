package com.scheakur.sandbox.springboot;

import java.util.ArrayList;
import java.util.List;

public class Data {

    private List<String> list;

    public Data() {
        this.list = new ArrayList<>();
    }

    public static Data with(int num) {
        Data d = new Data();
        for (int i = 0; i < num; i++) {
            d.list.add("");
        }
        return d;
    }

    public List<String> getList() {
        return list;
    }

    public void setList(List<String> list) {
        this.list = list;
    }

}
