package maps.marks;

import java.io.File;
import java.io.IOException;
import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.core.JsonParseException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;

@RestController
public class MarkController {
	
	static public String file = "./markers.json";
	
	//If we want to limit the domains where this REST can be call from, we should add here the specific ones
    @CrossOrigin(origins = "*")
	//@CrossOrigin(origins = "http://localhost:9000")
	@RequestMapping(value="/marks", method = RequestMethod.GET)
    @ResponseBody
	public List<Mark> getMarks() throws JsonParseException, JsonMappingException, IOException {
    	ObjectMapper mapper = new ObjectMapper();
    	File jsonFile = new File(file);
    	List<Mark> marks = mapper.readValue(jsonFile, new TypeReference<List<Mark>>(){});
	    return marks;
	}
    
    @CrossOrigin(origins = "*")
    //@CrossOrigin(origins = "http://localhost:9000")
    @RequestMapping(value = "/marks", method = RequestMethod.POST)
    @ResponseBody
    public String addMarks(@RequestBody List<Mark> marks) {
		ObjectMapper mapper = new ObjectMapper();
		
		try {
			// Convert object to JSON string and save into a file directly
			mapper.writerWithDefaultPrettyPrinter().writeValue(new File(file), marks);
			// Convert object to JSON string
			//mapper.writeValueAsString(marks);
			// Convert object to JSON string and pretty print
			//jsonInString = mapper.writerWithDefaultPrettyPrinter().writeValueAsString(marks);			
		} catch (IOException e) {
			// TODO Auto-generated catch block
	        return "Error overwritting markers file. Reason: "+e.getLocalizedMessage();
		}

        return "Markers added successfully ";
    }
}
