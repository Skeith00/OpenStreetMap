package marks;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import org.junit.Test;
import org.slf4j.Marker;

import com.fasterxml.jackson.core.JsonParseException;
import com.fasterxml.jackson.databind.JsonMappingException;

import maps.marks.Mark;
import maps.marks.MarkController;

public class MarkTest {

	public void test() {
		MarkController contr = new MarkController();
		try {
			contr.getMarks();
		} catch (JsonParseException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (JsonMappingException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
	
	public void test2() {
		MarkController contr = new MarkController();
		List<Mark> marcadores = new ArrayList<Mark>();
		Mark marcador = new Mark();
		//marcador.setMark(32.2222, 32.2222, "World", "hdhdh");
		//marcadores.add(marcador);
		//contr.addMarks(marcadores);
	}


	
}
