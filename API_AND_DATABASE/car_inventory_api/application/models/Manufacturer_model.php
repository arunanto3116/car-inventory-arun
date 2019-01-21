<?php if(!defined('BASEPATH')) exit('No direct script access allowed');
class Manufacturer_model extends CI_Model
{
	public function getManufacturers(){   		
		$this->db->select('CMAN.manufacturer_id,CMAN.manufacturer');
		$this->db->from('tbl_car_manufacturer AS CMAN');		
		$query = $this->db->get();
		return $query->result_array();
	}

	public function checkManufacturerUniqueness($data){   		
		$this->db->select('COUNT(manufacturer_id) as man_count');
		$this->db->from('tbl_car_manufacturer');
		$this->db->where('manufacturer', "$data");
		$query = $this->db->get();
		return $query->row_array();
	}
	
	public function addManufacturer($data){   		
		$this->db->insert('tbl_car_manufacturer', $data);		
		if ($this->db->affected_rows() > 0) {
			$insert_id = $this->db->insert_id();
			return $insert_id;				
		} else {
			return false;
		}
	}
}
?> 