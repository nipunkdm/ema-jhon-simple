import React from 'react';
import { useForm } from 'react-hook-form';
import { useAuth } from '../Login/useAuth';

const Ship = () => {
    const { register, handleSubmit, errors } = useForm();
    const onSubmit = data => console.log(data);
    const auth = useAuth();
  
    return (
      <div className="container">
          <form onSubmit={handleSubmit(onSubmit)} className="mt-1">
            <div className="form-group">
            <input name="name" className="form-control" defaultValue={auth.user.name} ref={register({ required: true })} placeholder="Name" />
            {errors.name && <span className="text-danger">Name is required</span>}
            </div>

            <div className="form-group">
            <input name="email" defaultValue={auth.user.email} className="form-control" ref={register({ required: true })} placeholder="Email" />
            {errors.email && <span className="text-danger">Email is required</span>}
            </div>

            <div className="form-group">
            <input name="addressLine1" className="form-control" ref={register({ required: true })} placeholder="Address Line 1"/>
            {errors.addressLine1 && <span className="text-danger">Address is required</span>}
            </div>

            <div className="form-group">
            <input name="addressLine2" className="form-control" ref={register} placeholder="Address Line 2" />
            </div>

            <div className="form-group">
            <input name="city" className="form-control" ref={register({ required: true })} placeholder="City" />
            {errors.city && <span className="text-danger">City is required</span>}
            </div>

            <div className="form-group">
            <input name="country" className="form-control" ref={register({ required: true })} placeholder="Country" />
            {errors.country && <span className="text-danger">Country is required</span>}
            </div>

            <div className="form-group">
            <input name="zipcode" className="form-control" ref={register({ required: true })} placeholder="Zip Code" />
            {errors.zipcode && <span className="text-danger">Zip Code is required</span>}
            </div>

            <input className="btn btn-success" type="submit" value="Submit"/>

          </form>
      </div>
    );
};

export default Ship; 