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
									<div class="img-box"><img src="https://i.imgur.com/RJCPBRB.jpg" alt="" /></div>
									<p class="testimonial">A educação foi transformadora na minha vida e na história da minha família. Então, se eu pudesse escolher um pedacinho de mim para deixar no mundo, para tornã-lo um tanto melhor, seria por meio da educação acessível. E o ALES, com certeza me ajuda a realizar esse propósito de poder colaborar nessa construção coletiva que promove a troca de saberes para Além da Escola. Obrigada, ALES!</p>
									<p class="overview"><b>Daniela Falco</b>, Coordenadora de S&C</p>
								</div>
								<div class="item">
									<div class="img-box"><img src="https://i.imgur.com/nSu3XM7.jpg" alt="" /></div>
									<p class="testimonial">Ao meu ver, o Projeto Ales simboliza uma crença inerente de todos nós na importância da educação, como um instrumento transformador de vidas. Por isso, para mim é uma honra estar envolvida por pessoas que, assim como eu, são apaixonadas por aprender e ajudar ao próximo. A cada aula sinto um sopro de esperança e me revigoro ao ver o nosso esforço em tornar a ciência cada vez mais acessível.</p>
									<p class="overview"><b>Gabriela Cassiano</b>, Coordenadora de Ciências</p>
								</div>
								<div class="item">
									<div class="img-box"><img src="https://i.imgur.com/xg8Q7Oh.jpg" alt="" /></div>
									<p class="testimonial">Fazer parte desse projeto me deixou próximo de pessoas incríveis que compartilham de um mesmo sonho, as quais só acrescentam na minha história. E ter a oportunidade de ser professor de uma área que sou apaixonado, não tem preço. Cada aula, um desafio diferente, sempre tentando mostrar que aprender também é divertido, e fazer parte desse processo me encanta!!!</p>
									<p class="overview"><b>Yago Sampaio</b>, Professor de programação</p>
								</div>
								<div class="item">
									<div class="img-box"><img src="https://i.imgur.com/khQ79fg.png" alt="" /></div>
									<p class="testimonial">Esse ano foi a minha primeira vez participando do Projeto ALES, e admito que não sabia bem como as coisas funcionariam ao decorrer do tempo, principalmente pelo fator da COVID e por termos que manter o distanciamento; fazendo aulas através de encontros virtuais. Era uma experiência nova em uma circunstância nova, basicamente. Mas percebi que isso não afetou a qualidade do nosso aprendizado, não tirou o carinho de todos os envolvidos neste projeto e não tirou a vontade de aprender e também de ensinar. Todos sempre foram muito atenciosos e queridos! E, embora de longe, a cada aula sinto-me como se estivesse mais e mais próxima deles! E isto é algo que prezo muito. Sei que, daqui 1, 5, 10 anos ou mais, terei como uma ótima recordação! Não apenas pelas coisas que aprendi durante o tempo no projeto, mas bem como os laços que criei com todo o pessoal.</p>
									<p class="overview"><b>Carla</b>, Aluna</p>
								</div>
								<div class="item">
									<div class="img-box"><img src="https://i.imgur.com/rNakLK0.png" alt="" /></div>
									<p class="testimonial">Esse foi meu primeiro semestre no ALES! Sinceramente, achei o projeto extremamente incrível!! Os professores são ótimos, super carismáticos, gentis, amigáveis, e muitas outras qualidades. Ter um conhecimento a mais sobre matérias importantes como ciências e matemática foram essenciais para mim, pois esses assuntos abrangentes relacionados à essas matérias, eu não estudei tão profundamente na escola como aprendi no ALES. Comecei a apreciar e me interessar ainda mais por ciências!! Resumindo kkkkkk esse projeto foi muito importante para mim, me trouxe vários conhecimentos que serão muito importantes na nova etapa da minha vida e para o futuro (indo para o Ensino Médio). Quero agradecer imensamente pela oportunidade que os professores me proporcionaram, saibam que vocês são incríveis e tiveram um papel importante em minha vida. Gostaria de participar novamente do projeto!!!</p>
									<p class="overview"><b>Antonio</b>, Aluno</p>
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
