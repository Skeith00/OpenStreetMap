package maps.marks;

import java.util.HashMap;
import java.util.Map;

public class Mark {
	
	private double latitude;
	private double longitude;
	private String type;
	private Map<String, Language> languages = new HashMap<String, Language>();

	public void setMark(Double latitude, Double longitude) {
		this.latitude = latitude;
		this.longitude =  longitude;
		this.type = "info";
	}	
	public double getLatitude() {
		return latitude;
	}
	public void setLatitude(double latitude) {
		this.latitude = latitude;
	}
	public double getLongitude() {
		return longitude;
	}
	public void setLongitude(double longitude) {
		this.longitude = longitude;
	}
	public String getType() {
		return type;
	}
	public void setType(String type) {
		this.type = type;
	}
	public Map<String, Language> getLanguages() {
		return languages;
	}
	public void setLanguages(Map<String, Language> languages) {
		this.languages = languages;
	}

}
