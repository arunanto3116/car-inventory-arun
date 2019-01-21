<?php
if (!defined('BASEPATH')) exit('No direct script access allowed');
date_default_timezone_set('Asia/Kolkata');
require APPPATH . '/libraries/REST_Controller.php';

class Manufacturer extends REST_Controller {

	public function __construct() { 
		parent::__construct();
		$this->load->library('form_validation');
		$this->load->helper(array('form', 'url'));
		$this->load->model('Manufacturer_model');				 
	}

	public function getManufacturers_get()
	{	   
		$Manufacturers = $this->Manufacturer_model->getManufacturers();		
		$this->response([
			'status' => true,
			'message' => 'Success',							
			'data' => $Manufacturers
		]);						
	}		
	
	public function addManufacturer_post()
	{	   
		$postdata=$this->post();				
		if(empty($postdata['manufacturer'])) { 
			#error
			$this->response([
				'status' => false,
				'message' => 'Insufficient Parameters.',
				'data' => []
			]);          
		}else
		{		
			$UNIQUE_DATA = $this->Manufacturer_model->checkManufacturerUniqueness($postdata['manufacturer']);		
			if(!empty($UNIQUE_DATA['man_count']))
			{
				$this->response([
					'status' => false,
					'message' => 'Manufacturer already exists.',							
					'data' => array()
				]);				
			}
			else
			{
				$RET_DATA = $this->Manufacturer_model->addManufacturer($postdata);		
				if (!empty($RET_DATA)) {
					#SUCCESS
					$this->response([
						'status' => true,
						'message' => 'Manufacturer added successfully.',							
						'data' => array("manufacturer_id"=>$RET_DATA)
					]);						
				} else {
					$this->response([
						'status' => false,
						'message' => 'Could not add manufacturer.',							
						'data' => array()
					]);
				}	
			
			}     
		}		

	}
	


}
    ?>






