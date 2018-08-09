import {describe} from "ava-spec";
import React from "react";
import {shallow} from "enzyme";
import {EventEmitter} from "events";
import Connector from "../src/connector";


describe('Connector', (test) => {
    const DIV_ID = 'content';
    test('should render children', (t) => {
        const mockMQTT = new EventEmitter();
        const mounted = shallow(
            <Connector mqqt={mockMQTT}>
                <div id={DIV_ID}/>
            </Connector>
        )
        t.true(mounted.find(`div#${DIV_ID}`).length === 1);
    })
    test('should receive only connection url', (t) => {
        const mounted = shallow(
            <Connector mqttProps={'wss://mqtturl.mt'}>
                <div id={DIV_ID}/>
            </Connector>
        );
        const props = mounted.instance().props;
        
        t.is(typeof props.mqttProps, 'string');
    })
    test('should receive an object as props with mqtt option', (t) => {
        const mounted = shallow(
            <Connector mqttProps={{ 
                host: 'wss://mqtturl.mt',
                user: 'user',
                password: 'password',
                clientId: 'client'
            }}>
                <div id={DIV_ID}/>
            </Connector>
        );

        const props = mounted.instance().props;

        t.is(typeof props.mqttProps, 'object');
    })

});
