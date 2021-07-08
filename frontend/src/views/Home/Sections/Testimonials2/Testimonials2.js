import React from "react";

import Container from "components/Container/Container";
import styles from "./Testimonials2.module.css";

const Testimonials = () => {
    return (

<Container>

<div class="container">
	<div class="row">
		<div class="col-md-8 col-center">
			<h2>DEPOIMENTOS DE ALUNOS E VOLUNTÁRIOS</h2>
			<div id="myCarousel" class="carousel slide" data-ride="carousel">

				<ol class="carousel-indicators">
					<li data-target="#myCarousel" data-slide-to="0" class="active"></li>
					<li data-target="#myCarousel" data-slide-to="1"></li>
					<li data-target="#myCarousel" data-slide-to="2"></li>
					<li data-target="#myCarousel" data-slide-to="3"></li>
					<li data-target="#myCarousel" data-slide-to="4"></li>
				</ol>   

				<div class="carousel-inner">
					<div class="item active">
						<div class="img-box"><img src="https://assets.pokemon.com/assets/cms2/img/pokedex/full/152.png" alt=""/></div>
						<p class="testimonial">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam eu sem tempor, varius quam at, luctus dui. Mauris magna metus, dapibus nec turpis vel, semper malesuada ante. Idac bibendum scelerisque non non purus. Suspendisse varius nibh non aliquet.</p>
						<p class="overview"><b>Paula Wilson</b>, Media Analyst</p>
					</div>
					<div class="item">
						<div class="img-box"><img src="https://cdn2.bulbagarden.net/upload/2/21/001Bulbasaur.png" alt=""/></div>
						<p class="testimonial">Vestibulum quis quam ut magna consequat faucibus. Pellentesque eget nisi a mi suscipit tincidunt. Utmtc tempus dictum risus. Pellentesque viverra sagittis quam at mattis. Suspendisse potenti. Aliquam sit amet gravida nibh, facilisis gravida odio.</p>
						<p class="overview"><b>Antonio Moreno</b>, Web Developer</p>
					</div>
					<div class="item">
						<div class="img-box"><img src="https://cdn2.bulbagarden.net/upload/6/6a/045Vileplume.png" alt=""/></div>
						<p class="testimonial">Phasellus vitae suscipit justo. Mauris pharetra feugiat ante id lacinia. Etiam faucibus mauris id tempor egestas. Duis luctus turpis at accumsan tincidunt. Phasellus risus risus, volutpat vel tellus ac, tincidunt fringilla massa. Etiam hendrerit dolor eget rutrum.</p>
						<p class="overview"><b>Michael Holz</b>, Seo Analyst</p>
					</div>
                    <div class="item">
						<div class="img-box"><img src="https://assets.pokemon.com/assets/cms2/img/pokedex/full/470.png" alt=""/></div>
						<p class="testimonial">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam eu sem tempor, varius quam at, luctus dui. Mauris magna metus, dapibus nec turpis vel, semper malesuada ante. Idac bibendum scelerisque non non purus. Suspendisse varius nibh non aliquet.</p>
						<p class="overview"><b>Paula Wilson</b>, Media Analyst</p>
					</div>
					<div class="item">
						<div class="img-box"><img src="https://assets.pokemon.com/assets/cms2/img/pokedex/full/182.png" alt=""/></div>
						<p class="testimonial">Vestibulum quis quam ut magna consequat faucibus. Pellentesque eget nisi a mi suscipit tincidunt. Utmtc tempus dictum risus. Pellentesque viverra sagittis quam at mattis. Suspendisse potenti. Aliquam sit amet gravida nibh, facilisis gravida odio.</p>
						<p class="overview"><b>Antonio Moreno</b>, Web Developer</p>
					</div>
				</div>
				<a class="carousel-control left" href="#myCarousel" data-slide="prev">
					<i class="fa fa-angle-left"></i>
				</a>
				<a class="carousel-control right" href="#myCarousel" data-slide="next">
					<i class="fa fa-angle-right"></i>
				</a>
			</div>
		</div>
	</div>
</div>

</Container>

    );
};


export default Testimonials;
