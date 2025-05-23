import React, { useEffect, useState } from 'react';
import ClientCards from '../../Components/ClientsPage/ClientCards';
import Modal from '../../Utils/Modal';
import WorkshopRegistrationForm from '../../Components/Forms/WorkshopRegistrationForm';
import Loading from '../../Utils/Loading';
import API_URL from '../../config';
function Clients() {
  const [workshopList, setWorkshopList] = useState([]);
  const [loading, setLoading] = useState(true); // Add a loading state

  useEffect(() => {
    const fetchWorkShopList = async () => {
      const response = await fetch(`${API_URL}/data/workshop/workshop-list`);
      if (response.ok) {
        const data = await response.json();
        setWorkshopList(data.data);
        setLoading(false); // Set loading to false when data is received
      } else {
        setTimeout(fetchWorkShopList, 2000);
      }
    };
    fetchWorkShopList();
  }, []);

  if (loading) {
    return (
      <div className='flex justify-center items-center h-screen'>
        <div className='flex flex-col items-center'>
          <Loading />
          <div className='text-gray-900 font-bold text-xl mt-4'>Loading...</div>
        </div>
      </div>
    );
  }

  if (!loading && !workshopList.length) {
    return (
      <div className='flex justify-center items-center h-screen'>
        <div className='flex flex-col items-center'>
          <Modal>
            <WorkshopRegistrationForm id='ModalBody' />
          </Modal>
          <div className='text-gray-900 font-bold text-xl mt-4'>Add New Workshop</div>
        </div>
      </div>
    );
  }

  if (!loading && workshopList.length) {
    return (
      <div className='px-4 md:px-10'>
        <div className='flex justify-between mt-2 text-left mb-5'>
          <div>
            <p className='text-gray-700 text-3xl font-bold'>Workshop</p>
            <p className='text-gray-500 text-lg font-semibold'>{window.location.pathname}</p>
          </div>
          <Modal>
            <WorkshopRegistrationForm id='ModalBody' />
          </Modal>
        </div>

        <div className='grid lg:grid-cols-3 xl:grid-cols-4 sm:grid-cols-2 2xl:grid-cols-5 gap-7 mb-16'>
          {workshopList.map((item) => (
            <ClientCards
              key={item.workshop_id}
              nameID={item.workshop_name}
              location={item.workshop_address}
              image='https://d12oja0ew7x0i8.cloudfront.net/images/news/ImageForNews_57209_16361199958445561.jpg'
              TWclass='bg-gradient-to-r from-red-600 to-red-300'
              workshopCode={item.workshop_id}
            />
          ))}
        </div>
      </div>
    );
  }
}

export default Clients;
