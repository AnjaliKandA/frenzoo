import React, { useEffect, useRef } from "react";
import { Bottom_cart_comp } from "../../../components/user";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
  decrementProduct,
  incrementProduct,
  selectTotalItemCount,
  selectTotalPrice,
} from "../../../Redux/Freatures/User/cartSlice";

function CartPage() {
  const products = useSelector((state) => state.cart.products);
  const totalAmount =  useSelector(selectTotalPrice)
  const totalItems =  useSelector(selectTotalItemCount)
  const dispatch = useDispatch();
  const PhonePeRef = useRef(null);
  const cashRef = useRef(null);
  const navigate =  useNavigate()

  const handlePayClick = (size) => {
    if (size === "phonepe") {
      PhonePeRef.current.checked = true;
    } else if (size === "cash") {
      cashRef.current.checked = true;
    }
  };

  const handleIncrement = (id) => {
    dispatch(incrementProduct({id}));
  };

  const handleDecrement = (id) => {
    dispatch(decrementProduct({id}));
  };

  useEffect(()=>{
    if(!products.length){
      navigate('/')
    }
  })

  return (
    <div className=" flex justify-center px-2 sm:px-4 w-full">
      <div className=" w-full sm:w-[34rem]  mb-[5rem] px-0 sm:px-4 py-4">
        <div className=" text-lg text-black font-semibold text-center">
          Frenzoo Cafe & Restaurant
        </div>
        <div className=" font-semibold mt-8">Food Items</div>
        {products &&
          products.map((product) => (
            <div className=" flex justify-between gap-2 mt-4 items-center shadow-custom  px-2 sm:px-4 py-4">
              <div className=" flex items-start w-1/2 gap-1 sm:gap-2">
                <img
                  className=" pt-1"
                  src="https://frenzoo.qrdine-in.com/assets/images/icons/veg.svg"
                  alt=""
                />
                <div>
                  <div className=" text-gray-800 text-sm sm:text-lg font-semibold">
                    {product.name}
                  </div>
                  <div className=" text-sm text-gray-500">
                    {product.description}
                  </div>
                </div>
              </div>
              <div className=" flex items-center gap-4 sm:gap-8">
                <div>
                  <div className=" flex border gap-5 rounded-md border-orange-400 justify-between items-center text-orange-400 px-2 py-1">
                    <button onClick={() => handleDecrement(product.id)}>
                      <i class="fa-solid fa-minus"></i>
                    </button>
                    <div>{product.quantity}</div>
                    <button onClick={() => handleIncrement(product.id)}>
                      <i class="fa-solid fa-plus"></i>
                    </button>
                  </div>
                </div>
                <div className=" text-orange-400 font-semibold">
                  ₹ {product.price * product.quantity}.00
                </div>
              </div>
            </div>
          ))}
        <Link
          to="/"
          className=" my-6 rounded-md bg-[#f5f5f5] border-dashed border flex justify-between items-center border-[#8d8f91] px-4 py-5 text-gray-600 text-sm"
        >
          <div>Add More</div>
          <div>
            <i className="fa-solid fa-chevron-right"></i>
          </div>
        </Link>
        <div className=" my-6 rounded-md bg-[#f5f5f5] border-dashed border border-[#8d8f91] px-4 py-5 text-gray-600 text-sm">
          <div>Add Cooking Instruction</div>
          <div>
            <input
              type="text"
              placeholder="Enter your cooking instruction here"
              className=" border-none py-2 px-3 w-[16rem] sm:w-[18rem] placeholder:text-gray-700 placeholder:text-[13px] sm:placeholder:text-sm rounded-md mt-3"
            />
          </div>
        </div>
        <div className=" font-semibold">Bill Details</div>
        <div className=" relative rounded-md mt-4 px-4 py-2 text-sm bg-[#f5f5f5] ">
          <div className=" py-2 flex justify-between">
            <div>
              <div>Sub Total</div>
              <div>Discrount</div>
            </div>
            <div className=" font-semibold">
              <div>₹ {totalAmount}.00</div>
              <div>₹ 00.00</div>
            </div>
          </div>
          <div className=" border-dashed border-b border-b-gray-300 pb-3 flex justify-between pt-2 items-center">
            <div>Tax</div>
            <div className=" font-semibold">₹ 00.00</div>
          </div>
          <div className=" flex justify-between items-center mt-2 mb-2">
            <div>Grand Total</div>
            <div className=" text-orange-400 font-semibold">₹ {totalAmount}.00</div>
          </div>
          <div className=" w-[95%] absolute bottom-0 left-1/2 -translate-x-1/2">
            <img
              className=" w-full"
              src="https://frenzoo.qrdine-in.com/assets/images/svg/dots-design.svg"
              alt=""
            />
          </div>
        </div>
        <div
          onClick={() => handlePayClick("phonepe")}
          className=" cursor-pointer mt-6 flex justify-between items-center shadow-custom px-3 py-4"
        >
          <div className=" flex gap-2 justify-center items-center">
            <div className=" flex justify-center  items-center w-8 h-8">
              <img
                src="https://frenzoo.qrdine-in.com/assets/images/icons/phonepay.png"
                alt=""
              />
            </div>
            <div>Phone Pe</div>
          </div>
          <div>
            <input
              type="radio"
              value="1"
              name="pay"
              ref={PhonePeRef}
              className=" checked:text-orange-400 checked:bg-orange-400 bg-orange-400"
            />
          </div>
        </div>
        <div
          onClick={() => handlePayClick("cash")}
          className=" cursor-pointer mt-6 flex justify-between items-center shadow-custom px-3 py-4"
        >
          <div className=" flex gap-2 justify-center items-center">
            <div className=" flex justify-center items-center w-10 h-10">
              <img
                src="https://frenzoo.qrdine-in.com/assets/images/icons/svg/cash.svg"
                alt=""
              />
            </div>
            <div>Cash</div>
          </div>
          <div>
            <input type="radio" value="1" name="pay" ref={cashRef} />
          </div>
        </div>
      </div>
      <Bottom_cart_comp
        price={totalAmount}
        item={totalItems}
        action="Proceed to Checkout"
        to="/preference"
      />
    </div>
  );
}

export default CartPage;
