<?php if(!defined('BASEPATH')) exit('No direct script access allowed');
class Cars_model extends CI_Model
{
	public function getCars(){   
		$query = $this->db->query(" SELECT 
									IFNULL(GROUP_CONCAT(CMOD.model_id SEPARATOR '_'),0) as model_ids,
									CMAN.manufacturer,
									IFNULL(CMOD.model,'--') AS model,
									IFNULL(( SELECT COUNT(manufacturer_id) FROM tbl_car_model WHERE tbl_car_model.model = CMOD.model AND tbl_car_model.manufacturer_id = CMAN.manufacturer_id AND tbl_car_model.sold = 0  ),0) AS model_count
									FROM tbl_car_manufacturer AS CMAN
									LEFT JOIN tbl_car_model AS CMOD on CMOD.manufacturer_id = CMAN.manufacturer_id 									
									GROUP BY CMAN.manufacturer_id,CMOD.model ");					
		return $query->result_array();
	}
	
	public function getCarModelDetails($ids){   
	  $ids = explode('_',$ids);
	  $this->db->select('CMOD.model_id,
	  CMOD.manufacturer_id,
	  CMOD.model,
	  CMOD.color,
	  CMOD.manufacturing_year,
	  CMOD.registration_number,
	  CMOD.note,
	  CMOD.file_name_1,
	  CMOD.file_name_2,
	  CMOD.sold,
	  CMAN.manufacturer');
	  $this->db->from('tbl_car_model AS CMOD');
	  $this->db->join('tbl_car_manufacturer AS CMAN', 'CMAN.manufacturer_id = CMOD.manufacturer_id');	  
	  $this->db->where_in('CMOD.model_id', $ids);
	  $this->db->where('CMOD.sold', 0);
	  $query = $this->db->get();
	  return $query->result_array();		
	}
	
	public function addModel($data){   		
		$this->db->insert('tbl_car_model', $data);		
		if ($this->db->affected_rows() > 0) {
			$insert_id = $this->db->insert_id();
			return $insert_id;				
		} else {
			return false;
		}
	}
	
	public function checkRegistrationNumberUniqueness($data){   		
		$this->db->select('COUNT(model_id) as reg_count');
		$this->db->from('tbl_car_model');
		$this->db->where('registration_number', "$data");
		$query = $this->db->get();
		return $query->row_array();
	}
	
	public function markSold($id){
		$this->db->where('model_id', $id);
		$this->db->update('tbl_car_model', array("sold"=>1));
		if ($this->db->affected_rows() > 0) {
			return true;
		} else {
			return false;
		}		
	}
	
	public function updateFileName($id,$name,$no)
	{
		$this->db->where('model_id', $id);
		$this->db->update('tbl_car_model', array("file_name_$no"=>$name));
		if ($this->db->affected_rows() > 0) {
			return true;
		} else {
			return false;
		}				
	}
	
	public function saveImage($data)
	{	   		
		$base = $data['value'];
		$filetype = $data['filetype'];
		$pos = strpos($base, ',');
		$pos++;
		$base_64_data = substr($base,$pos);
		$imagetest=base64_decode($base_64_data);
		$path = realpath(getcwd()).'/assets/images/';
		$pos = strpos($filetype, '/');
		$pos++;
		$image_ext = substr($filetype,$pos);
		$imagename = uniqid().'.'.$image_ext;
		$file = $path.$imagename;
		$success = file_put_contents($file, $imagetest);   
		return array("file_status"=>$success,"filename"=>$imagename);
	}			
	
}
?> 