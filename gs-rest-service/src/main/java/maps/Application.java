package maps;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication(scanBasePackages={"maps"})
public class Application {
	//java -jar namejar
    public static void main(String[] args) {
        SpringApplication.run(Application.class, args);
    }
}
