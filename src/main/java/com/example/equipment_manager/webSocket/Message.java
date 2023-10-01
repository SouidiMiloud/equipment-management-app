package com.example.equipment_manager.webSocket;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


@Getter
@Setter
@NoArgsConstructor
public class Message {

    private String receiverEmail;
    private String senderEmail;
    private String content;
}