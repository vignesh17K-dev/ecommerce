import React, { useEffect, useState } from 'react'
import { Col, Container, Row, Spinner } from 'reactstrap'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Fetchproducts } from '../Reducer'
import ProductCard from '../Components/ProductCard'
import { TbLayoutGrid, TbLayoutBottombar } from 'react-icons/tb';
import SingleProductCard from '../Components/SingleProductCard'
import { TiTick } from 'react-icons/ti';
import axios from 'axios'
import NotFound from '../Components/NotFound'


function Products() {



    const [range, setrange] = useState(309999)

    const [layout, setlayout] = useState(true)

    const [loading, setloading] = useState(true)

    const [productdata, setproductdata] = useState([])

    const [activecat,setactivecat] = useState(null)

    const [activecol,setactivecol] = useState(null)

    const [filteringcategory,setfilteringcategory] = useState([])

    const [filteringcompany,setfilteringcompany] = useState([])

    const [, setfilteringcolor] = useState([])


    const dispatch = useDispatch()

    const AllProducts = useSelector(state => state.State.Products)

    const Getproducts = async () => {
        setloading(true)
        let data = await axios.get("https://course-api.com/react-store-products")
        setloading(false)
        setproductdata(data.data)
        dispatch(Fetchproducts(data.data))
        setfilteringcategory(data.data)
        setfilteringcompany(data.data)
        setfilteringcolor(data.data)
    }

    // console.log(filteringcolor)


    const filtercategory = (id,filter)=>{
        setactivecat(id)
        if(filter === "all"){
            setfilteringcategory(AllProducts)
            setproductdata(AllProducts)
        }else{
         let filtereddata = AllProducts.filter(ele => (ele.category === filter))
        setproductdata(filtereddata)
        setfilteringcategory(filtereddata)
        }
    }


    const filtercompany = (filter)=>{
     if(filter === "all"){
        setproductdata(filteringcategory)
     }else{
        let filtereddata = filteringcategory.filter(ele => (ele.company === filter))
       setproductdata(filtereddata)
       setfilteringcompany(filtereddata)
     }
    }


    const filterprice =(e)=>{
         setrange(e.target.value)
          let filtereddata =  AllProducts.filter(ele => (ele.price  <= range))
           setproductdata(filtereddata)
    }


    const filtercolor = (id,filter)=>{
        setactivecol(id)
        if(filter === "all"){
            setfilteringcolor(AllProducts)
            setproductdata(filteringcompany)
        }else{
     
         let filtereddata = filteringcompany.filter(ele => (ele.colors[0] === filter ))
            setproductdata(filtereddata)
            setfilteringcolor(filtereddata)
        }
    }



//    const filtersort = (value)=>{
//         if(value === "low" ){
//          let sorted =  productdata.sort((a,b)=>(a.price - b.price))
//          console.log(sorted)
//          setproductdata(sorted)
//         }else if(value === "high"){
//             let sorted =  productdata.sort((a,b)=>(b.price - a.price))
//             console.log(sorted)
//             setproductdata(sorted)
//         }
       
//    }

   const filtersearch = (value)=>{
       let search =  AllProducts.filter(ele => (ele.name.includes(value)))
       setproductdata(search)
       }


    useEffect(() => {
        Getproducts()
           // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])


    const handleproduct = () => {

        if (layout) {

            if (loading) {
                return (
                    <div className="d-flex text-dark justify-content-center ">
                        <Spinner style={{ width: '3rem', height: '3rem' }} />
                    </div>
                )
            } else {
                  if(productdata.length === 0){
                      return (
                          <NotFound/>
                      )
                  }else{
                let layout1 = productdata.map((ele, index) => (
                    <ProductCard id={ele.id} key={index} img={ele.image} title={ele.name} price={ele.price} />
                ))
                return (
                    <div className='display-products-layout1'>
                        {layout1}
                    </div>
                )

            }
        }
        } else {
             if(productdata.length === 0){
                 return (
                    <NotFound/>
                 )
             }else{
            let layout2 = productdata.map((ele, index) => (
                <SingleProductCard des={ele.description} id={ele.id} key={index} img={ele.image} title={ele.name} price={ele.price} />
            ))
            return (
                <div>
                    {layout2}
                </div>
            )
        }

    }
    }

 

    const Colors = [

        {
            id: 8,
            color: "rgb(219, 87, 87)",
            value: "#ff0000"
        },
        {
            id: 9,
            color: "rgb(149, 254, 151)",
            value: "#00ff00"
        },
        {
            id: 10,
            color: "rgb(133, 146, 253)",
            value: "0000ff"
        },
        {
            id: 11,
            color: "rgb(128, 128, 128)",
            value: "#000"
        },
        {
            id: 12,
            color: "rgb(254, 220, 150)",
            value: "#ffb900"
        }
    ]

    const Category = [
        {
            id: 1,
            name: "All",
            cat: "all"
        },
        {
            id: 2,
            name: "Office",
            cat: "office",

        },
        {
            id: 3,
            name: "Living Room",
            cat: "living room",
        },
        {
            id: 4,
            name: "Kitchen",
            cat: "kitchen",
        },
        {
            id: 5,
            name: "Bedroom",
            cat: "bedroom",
        },
        {
            id: 6,
            name: "Dining",
            cat: "dining",
        },
        {
            id: 7,
            name: "Kids",
            cat: "kids",
        }
    ]




    return (
        <div>

            <Container fluid className='py-5 px-5' style={{ backgroundColor: "rgb(234,222,216)" }}>
                <h3 className='abt-title'>  <Link to="/" className='abt' style={{ color: "rgb(102, 77, 50)" }} >Home </Link> <span>/</span> <span>Products</span> </h3>
            </Container>

            <Container fluid className='mt-5'>

                <Row>

                    <Col lg={3} className="filter-section" >

                        <div className='my-4 mx-5'>

                            <input type="text" onChange={(e)=>filtersearch(e.target.value)} placeholder='Search' className='form-control input-fil'></input>

                            <div>

                                <h5 className='mt-4'>Category</h5>


                                <ul className='list-cat'>

                                    {Category.map((ele, index) => (
                                        <li key={index} id={ele.id} className={activecat === ele.id ? "cat-active" : ""} onClick={() => filtercategory(ele.id,ele.cat)} >{ele.name}</li>
                                    ))}
                                </ul>
                            </div>


                            <div>

                                <h5 className='mt-4'>Company</h5>
                                <select className='select mx-4 py-1 px-1' onChange={(e)=>filtercompany(e.target.value)} >
                                    <option value={"all"} >all</option>
                                    <option value={"marcos"} >marcos</option>
                                    <option value={"liddy"} >liddy</option>
                                    <option value={"ikea"} >ikea</option>
                                    <option value={"caressa"} >caressa</option>
                                </select>
                            </div>

                            <div >
                                <h5 className='mt-4'>Colors</h5>
                                <div className='colors mx-4'>

                                    <div style={{ cursor: "pointer" }} onClick={() => setproductdata(filteringcompany)}>
                                        All
                                    </div >
                                    {Colors.map((ele, index) => (

                                        <div className="btns" id={ele.id} onClick={()=>filtercolor(ele.id,ele.value)} key={index} style={{ backgroundColor: ele.color }}>
                                            {activecol === ele.id ? <TiTick className='text-light mb-5' /> : ""}
                                        </div>
                                    )
                                    )}
                                </div>
                            </div>

                            <div>
                                <h5 className='mt-4'>Price</h5>
                                <p className='mx-4'>${range / 100}</p>
                                <input min="0" max="309999" value={range} onChange={filterprice} type="range" className='mx-4' ></input>
                            </div>

                        </div>
                    </Col>

                    <Col lg={9} >

                        <div className='filter-comp my-2'>

                            <div className='filter-layout'>

                                <div className='my-3 mx-3'>
                                    <TbLayoutGrid className={layout ? 'layout1-clicked mx-1' : "layout1"} onClick={() => setlayout(true)} />
                                    <TbLayoutBottombar className={layout ? "layout1" : "layout1-clicked mx-1"} onClick={() => setlayout(false)} />
                                </div>


                                <p className='my-2 mx-2'>{productdata.length} Products Found</p>

                            </div>

                            <div className='sort-component mx-3'>

                                {/* <p className='my-2 mx-2 sort-text'>Sort By</p>
                                <select className='sel' onChange={(e)=>filtersort(e.target.value)}>
                                    <option value={"low"}>Price (Lowest)</option>
                                    <option value={"high"}>Price (Highest)</option>
                                    <option value={"acend"}>Name (A-Z)</option>
                                    <option value={"decend"}>Name (Z-A)</option>
                                </select> */}

                            </div>


                        </div>

                        {handleproduct()}
                    </Col>

                </Row>




            </Container>


        </div>
    )
}

export default Products