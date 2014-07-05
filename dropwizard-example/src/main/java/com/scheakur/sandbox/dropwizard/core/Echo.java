package com.scheakur.sandbox.dropwizard.core;

import com.fasterxml.jackson.annotation.JsonProperty;
import org.hibernate.validator.constraints.Length;

public class Echo {

    private long id;

    @Length(max = 3)
    private String content;

    public Echo() {
        // Jackson deserialization
    }

    public Echo(long id, String content) {
        this.id = id;
        this.content = content;
    }

    @JsonProperty
    public long getId() {
        return id;
    }

    @JsonProperty
    public String getContent() {
        return content;
    }

}
