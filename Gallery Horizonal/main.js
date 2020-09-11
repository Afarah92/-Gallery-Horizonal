"use strict";

console.clear();

const clamp = (value, min, max) => Math.min(Math.max(min, value), max);

const root = new Vue({
  el: "#app",

  data() {
    return {
      scrollX: 0,
      accel: 0,
      velocity: 0,
      friction: 0.92,
      maxScrollX: 1,
      xEndSpace: 200,
      xGap: 90,
      yGap: 30,
      imageWidth: 360,
      imageHeight: 200,
      startX: 100,
      gallery: [
        "https://images.unsplash.com/photo-1469107453692-b511d4578853?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjE0NTg5fQ&s=d8f9a817832d60c18f240d8b610a97b1",
        "https://images.unsplash.com/photo-1528789848712-df46cdef2330?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjE0NTg5fQ&s=287cddf2087ee8e8a0e70380903945c3",
        "https://images.unsplash.com/photo-1527168027773-0cc890c4f42e?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjE0NTg5fQ&s=95506233bedb039e7e80c01a636b78c2",
        "https://images.unsplash.com/photo-1527784281695-866fa715d9d8?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjE0NTg5fQ&s=6379722f1d16aa7cd32aea2a745b4f3a",
        "https://images.unsplash.com/photo-1525596201491-f6eae338a205?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjE0NTg5fQ&s=f3643dc475b490f19e5f5a1d64fd079f",
        "https://images.unsplash.com/photo-1525276894205-27b055a29c6c?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjE0NTg5fQ&s=eb0305b0cea381dccf524336e0a199d7",
        "https://images.unsplash.com/photo-1469107453692-b511d4578853?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjE0NTg5fQ&s=d8f9a817832d60c18f240d8b610a97b1",
        "https://images.unsplash.com/photo-1528789848712-df46cdef2330?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjE0NTg5fQ&s=287cddf2087ee8e8a0e70380903945c3",
        "https://images.unsplash.com/photo-1527168027773-0cc890c4f42e?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjE0NTg5fQ&s=95506233bedb039e7e80c01a636b78c2",
        "https://images.unsplash.com/photo-1527784281695-866fa715d9d8?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjE0NTg5fQ&s=6379722f1d16aa7cd32aea2a745b4f3a",
        "https://images.unsplash.com/photo-1525596201491-f6eae338a205?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjE0NTg5fQ&s=f3643dc475b490f19e5f5a1d64fd079f",
        "https://images.unsplash.com/photo-1525276894205-27b055a29c6c?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjE0NTg5fQ&s=eb0305b0cea381dccf524336e0a199d7"
      ]
    };
  },

  methods: {
    figureStyle(index) {
      const xOffset =
        index % 2 === 0 ? this.startX : this.startX + this.startOffset;
      const colIdx = Math.floor(index / 2);
      const x = xOffset + colIdx * (this.imageWidth + this.xGap);
      const y = (index % 2 === 0 ? -1 : 1) * (this.imageHeight / 2 + this.yGap);
      const rotate = clamp(this.velocity / 20, -0.5, 0.5);
      return {
        marginTop: `${-this.imageHeight / 2}px`,
        width: `${this.imageWidth}px`,
        height: `${this.imageHeight}px`,
        transform: `translate(${x}px, ${y}px) rotate(${rotate}deg)`
      };
    },

    onMouseWheel(e) {
      const force = (clamp(e.deltaY, -300, 300) / 300) * 25;
      this.accel += force;
      console.log(this.accel);
    },

    update() {
      this.updateScroll();
      requestAnimationFrame(this.update.bind(this));
    },

    updateScroll() {
      this.velocity += this.accel;
      this.scrollX = clamp(this.scrollX + this.velocity, 0, this.maxScrollX);
      this.velocity *= this.friction;
      if (Math.abs(this.velocity) < 0.001) this.velocity = 0;
      this.accel = 0;
    },

    onResize() {
      const halfLen = Math.floor((this.galleryLength + 1) / 2);
      const xOffset =
        this.galleryLength % 2 === 0
          ? this.startX + this.startOffset
          : this.startX;
      this.maxScrollX =
        halfLen * this.imageWidth +
        xOffset +
        (halfLen - 1) * this.xGap -
        window.innerWidth +
        this.xEndSpace;
    }
  },
  computed: {
    startOffset() {
      return this.imageWidth - (this.imageWidth - this.xGap) / 2;
    },

    galleryLength() {
      return this.gallery.length;
    },

    progress() {
      return this.scrollX / this.maxScrollX;
    },

    progressBarStyle() {
      return {
        transform: `scaleX(${this.progress})`
      };
    },

    galleryTransformStyle() {
      return {
        transform: `translateX(${-this.scrollX}px)`
      };
    }
  },

  mounted() {
    this.galleryEl = this.$el.querySelector(".gallery__inner");
    window.addEventListener("resize", this.onResize.bind(this));
    window.addEventListener("wheel", this.onMouseWheel.bind(this));
    this.onResize();
    this.update();
  }
});