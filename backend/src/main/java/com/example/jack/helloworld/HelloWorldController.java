package com.example.jack.helloworld;

import com.example.jack.helloworld.HelloWorldBean;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HelloWorldController {

    //GET
    //URI - /hello-world
    //method - "Hello World
//    @RequestMapping(method=RequestMethod.GET, path="/hello-world")
    @GetMapping(path="/hello-world")
    @CrossOrigin(origins = "http://localhost:4200")
    public  String helloWorld() {
        return "Hello World";
    }

    @GetMapping(path="/hello-world-bean")
    @CrossOrigin(origins = "http://localhost:4200")
    public HelloWorldBean helloWorldBean() {
        return new HelloWorldBean("Jack");
    }

    @GetMapping(path="/hello-world/path-variable/{name}")
    @CrossOrigin(origins = "http://localhost:4200")
    public HelloWorldBean helloWorldPathVariable(@PathVariable String name) {
//        throw new RuntimeException("Something went wrong");
        return  new HelloWorldBean(String.format("Hello World, %s", name));
    }

}
