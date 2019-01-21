<?php
if (!defined('BASEPATH')) exit('No direct script access allowed');
date_default_timezone_set('Asia/Kolkata');
require APPPATH . '/libraries/REST_Controller.php';

class Cars extends REST_Controller {

	public function __construct() { 
		parent::__construct();
		$this->load->library('form_validation');
		$this->load->helper(array('form', 'url'));
		$this->load->model('Cars_model');				 
	}

	public function getCars_get()
	{	   
		$CARS_DATA = $this->Cars_model->getCars();		
		$this->response([
			'status' => true,
			'message' => 'Success',							
			'data' => $CARS_DATA
		]);						
	}	

	public function getCarModelDetails_get($ids)
	{	
		if(!empty($ids))
		{
			$CarModelDetails = $this->Cars_model->getCarModelDetails($ids);		
			$this->response([
				'status' => true,
				'message' => 'Success',							
				'data' => $CarModelDetails
			]);	
		}
		else
		{
			$this->response([
				'status' => false,
				'message' => 'Insufficient Parameters.',
				'data' => []
			]);          			
		}
	}	
	
	public function addModel_post()
	{	   
		$postdata=$this->post();				
		if(empty($postdata['modelData'])) { 
			#error
			$this->response([
				'status' => false,
				'message' => 'Insufficient Parameters.',
				'data' => []
			]);          
		}else
		{		
			$UNIQUE_DATA = $this->Cars_model->checkRegistrationNumberUniqueness($postdata['modelData']['registration_number']);		
			if(!empty($UNIQUE_DATA['reg_count']))
			{
				$this->response([
					'status' => false,
					'message' => 'Registration number already exists.',							
					'data' => array()
				]);				
			}
			else
			{			
				$RET_DATA = $this->Cars_model->addModel($postdata['modelData']);					
				if (!empty($RET_DATA)) {
					if(!empty($postdata['avatar']))
					{
						$File_Status = $this->Cars_model->saveImage($postdata['avatar']);					
						if(!empty($File_Status['file_status']))
						{
							#FILE UPLOADED SUCCESSFULLY
							$this->Cars_model->updateFileName($RET_DATA,$File_Status['filename'],1);
						}
					}
					if(!empty($postdata['avatar1']))
					{
						$File_Status = $this->Cars_model->saveImage($postdata['avatar1']);					
						if(!empty($File_Status['file_status']))
						{
							#FILE UPLOADED SUCCESSFULLY
							$this->Cars_model->updateFileName($RET_DATA,$File_Status['filename'],2);
						}
					}					
					#SUCCESS
					$this->response([
						'status' => true,
						'message' => 'Vehicle Model added successfully.',							
						'data' => array("model_id"=>$RET_DATA)				
					]);						
				} else {
					$this->response([
						'status' => false,
						'message' => 'Could not add vehicle model.',							
						'data' => array()
					]);
				}	
			}   
   
		}
		
	}
	
	public function markSold_post()
	{			
		$postdata=$this->post();
		if(!empty($postdata['model_id']))
		{
			$data = $this->Cars_model->markSold($postdata['model_id']);		
			$this->response([
				'status' => true,
				'message' => 'Model sold.',							
				'data' => $this->Cars_model->getCarModelDetails($postdata['model_id_grouped'])		
			]);	
		}
		else
		{
			$this->response([
				'status' => false,
				'message' => 'Insufficient Parameters.',
				'data' => $postdata
			]);          			
		}
	}	

}
?>






